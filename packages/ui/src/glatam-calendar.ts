import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { generateMonthDays, generateWeekDays, formatISODate, isTimeBlocked, BlockingRule, TimeSlot } from '@glatam/calendar-core';
import { variablesStyles } from './styles/variables.css.js';
import { calendarStyles } from './styles/calendar.css.js';
import { getTimezoneOffsetDiff, shiftSlot } from './utils/timezone-utils.js';

import './views/month-view.js';
import './views/week-view.js';
import './views/day-view.js';
import './components/calendar-modal.js';

const DEFAULT_SLOTS: TimeSlot[] = [
  { start: '09:00', end: '10:00' }, { start: '10:00', end: '11:00' },
  { start: '11:00', end: '12:00' }, { start: '12:00', end: '13:00' },
  { start: '13:00', end: '14:00' }, { start: '14:00', end: '15:00' },
  { start: '15:00', end: '16:00' }, { start: '16:00', end: '17:00' },
  { start: '17:00', end: '18:00' },
];

@customElement('glatam-calendar')
export class GlatamCalendar extends LitElement {
  static styles = [variablesStyles, calendarStyles];

  @property({ type: String }) role = 'provider'; @property({ type: String, reflect: true }) size = 'medium';
  @property({ type: String }) view: 'month' | 'week' | 'day' = 'month'; @property({ type: String }) locale = 'es';
  @property({ type: Number }) startOfWeekDay = 0; @property({ type: Array }) rules: BlockingRule[] = [];
  @property({ type: Array }) selectedDates: string[] = []; @property({ type: Object }) selectedRange: { dateString: string; start: string; end: string } | null = null;
  @property({ type: String }) hostTimezone = 'America/Bogota'; @property({ type: String }) activeTimezone = 'local';
  @property({ type: Array }) slots: TimeSlot[] = DEFAULT_SLOTS; @property({ type: String }) minDate = ''; @property({ type: String }) maxDate = '';
  @property({ type: Boolean }) showNeighboringMonth = true; @property({ attribute: false }) tileClassName: ((data: { date: Date; dateString: string }) => string) | null = null;

  @state() private activeDate = new Date(); @state() private localRules: BlockingRule[] = [];
  @state() private darkMode = false; @state() private modalOpen = false;
  @state() private modalDateString = ''; @state() private modalStartTime = ''; @state() private modalEndTime = '';
  @state() private modalIsRange = false; @state() private modalExistingRule: BlockingRule | null = null;

  firstUpdated() { this.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches; this.localRules = [...this.rules]; }
  willUpdate(changedProps: Map<string, any>) { if (changedProps.has('rules') && this.rules.length > 0 && this.localRules.length === 0) this.localRules = [...this.rules]; }
  updated(changedProps: Map<string, any>) { if (changedProps.has('darkMode')) this.classList.toggle('dark-mode', this.darkMode); }

  private handlePrev() {
    const d = new Date(this.activeDate);
    this.view === 'month' ? d.setMonth(d.getMonth() - 1) : this.view === 'week' ? d.setDate(d.getDate() - 7) : d.setDate(d.getDate() - 1);
    this.activeDate = d;
  }

  private handleNext() {
    const d = new Date(this.activeDate);
    this.view === 'month' ? d.setMonth(d.getMonth() + 1) : this.view === 'week' ? d.setDate(d.getDate() + 7) : d.setDate(d.getDate() + 1);
    this.activeDate = d;
  }

  private getHeaderTitle(): string {
    const opt: Intl.DateTimeFormatOptions = this.view === 'month' ? { month: 'long', year: 'numeric' } : this.view === 'week' ? { month: 'short', year: 'numeric' } : { day: 'numeric', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat(this.locale, opt).format(this.activeDate);
  }

  private handleDaySelect(e: CustomEvent<{ dateString: string; isBlocked: boolean }>) {
    const { dateString, isBlocked } = e.detail;
    if (this.role === 'buyer' && isBlocked) return;
    this.activeDate = new Date(dateString + 'T00:00:00');
    this.view = 'day';
    this.dispatchEvent(new CustomEvent('date-selected', { detail: { dateString }, bubbles: true, composed: true }));
  }

  private handleRangeSelect(e: CustomEvent<{ dateString: string; start: string; end: string }>) {
    const { dateString, start, end } = e.detail, offset = this.activeTimezone === 'local' ? getTimezoneOffsetDiff(this.activeDate, this.hostTimezone, 'local') : 0;
    const todayStr = new Date().toISOString().split('T')[0];
    const limitMinDate = this.minDate || (this.role === 'buyer' ? todayStr : '');
    if (this.role === 'buyer' && limitMinDate && dateString < limitMinDate) return;

    const displaySlots = this.getDisplaySlots(offset), startIdx = displaySlots.findIndex(s => s.start === start), endIdx = displaySlots.findIndex(s => s.end === end);
    const hostStart = this.slots[startIdx]?.start || start, hostEnd = this.slots[endIdx]?.end || end;
    if (this.role === 'buyer') {
      this.selectedRange = { dateString, start, end };
      this.dispatchEvent(new CustomEvent('booking-selected', { detail: { dateString, start, end, hostStart, hostEnd }, bubbles: true, composed: true }));
      return;
    }
    this.openModal(dateString, hostStart, hostEnd, true, null);
  }

  private handleSlotClick(e: CustomEvent<{ dateString: string; slot: TimeSlot & { isBlocked?: boolean } }>) {
    const { dateString, slot } = e.detail, date = new Date(dateString + 'T00:00:00'), offset = this.activeTimezone === 'local' ? getTimezoneOffsetDiff(this.activeDate, this.hostTimezone, 'local') : 0;
    const todayStr = new Date().toISOString().split('T')[0];
    const limitMinDate = this.minDate || (this.role === 'buyer' ? todayStr : '');
    if (this.role === 'buyer' && (slot.isBlocked || (limitMinDate && dateString < limitMinDate))) return;

    const displaySlots = this.getDisplaySlots(offset), idx = displaySlots.findIndex(s => s.start === slot.start), hostSlot = this.slots[idx] || slot;
    if (this.role === 'buyer') {
      this.selectedRange = { dateString, start: slot.start, end: slot.end };
      this.dispatchEvent(new CustomEvent('booking-selected', { detail: { dateString, start: slot.start, end: slot.end, hostStart: hostSlot.start, hostEnd: hostSlot.end }, bubbles: true, composed: true }));
      return;
    }
    const rule = this.localRules.find(r => isTimeBlocked(date, hostSlot, [r]));
    this.openModal(dateString, hostSlot.start, hostSlot.end, true, rule || null);
  }

  private handleBlockDayAction() {
    const dateStr = formatISODate(this.activeDate), rule = this.localRules.find(r => isTimeBlocked(this.activeDate, undefined, [r]));
    this.openModal(dateStr, '', '', false, rule || null);
  }

  private openModal(date: string, start: string, end: string, isRange: boolean, rule: BlockingRule | null) {
    this.modalDateString = date; this.modalStartTime = start; this.modalEndTime = end; this.modalIsRange = isRange; this.modalExistingRule = rule; this.modalOpen = true;
  }

  private handleSaveRule(e: CustomEvent) {
    const data = e.detail, ruleId = this.modalExistingRule ? this.modalExistingRule.id : `rule-${Date.now()}`;
    const newRule: BlockingRule = {
      id: ruleId, type: data.isRecurring ? 'weekly' : 'date-range',
      slots: data.blockAllDay ? undefined : [{ start: data.startTime, end: data.endTime }],
      daysOfWeek: data.isRecurring ? data.selectedDays : undefined,
      startDate: data.isRecurring ? undefined : data.dateString,
      endDate: data.isRecurring ? undefined : data.dateString,
      description: data.title
    };
    this.localRules = this.modalExistingRule ? this.localRules.map(r => r.id === ruleId ? newRule : r) : [...this.localRules, newRule];
    this.modalOpen = false;
    this.dispatchEvent(new CustomEvent('rules-changed', { detail: { rules: this.localRules }, bubbles: true, composed: true }));
  }

  private handleDeleteRule(e: CustomEvent<{ id: string }>) {
    this.localRules = this.localRules.filter(r => r.id !== e.detail.id);
    this.modalOpen = false;
    this.dispatchEvent(new CustomEvent('rules-changed', { detail: { rules: this.localRules }, bubbles: true, composed: true }));
  }

  private getDisplaySlots(offset: number): TimeSlot[] {
    if (offset === 0) return this.slots;
    return this.slots.map(s => {
      const shifted = shiftSlot(s, offset);
      const suffix = shifted.dayShift > 0 ? ' (+1d)' : shifted.dayShift < 0 ? ' (-1d)' : '';
      return { start: shifted.start + suffix, end: shifted.end + suffix };
    });
  }

  render() {
    const y = this.activeDate.getFullYear(), m = this.activeDate.getMonth(), isCurrentDayBlocked = isTimeBlocked(this.activeDate, undefined, this.localRules);
    const offset = this.activeTimezone === 'local' ? getTimezoneOffsetDiff(this.activeDate, this.hostTimezone, 'local') : 0, displaySlots = this.getDisplaySlots(offset);
    const mapDays = (days: any[]) => days.map(d => ({ ...d, slots: d.slots.map((s: any, idx: number) => ({ ...s, start: displaySlots[idx]?.start || s.start, end: displaySlots[idx]?.end || s.end })) }));
    const tzCity = this.hostTimezone.split('/').pop()?.replace('_', ' ') || 'Anfitrión';

    return html`
      <div class="calendar-header">
        <div class="nav-group">
          <button class="btn" @click=${() => this.activeDate = new Date()}>Hoy</button>
          <button class="btn" @click=${this.handlePrev}>&lt;</button>
          <button class="btn" @click=${this.handleNext}>&gt;</button>
          <span class="nav-title" style="text-transform: capitalize;">${this.getHeaderTitle()}</span>
        </div>
        
        <div class="view-group">
          ${this.role === 'provider' ? html`
            <div class="timezone-badge">
              🌐 Zona:
              <select class="timezone-select" @change=${(e: any) => this.activeTimezone = e.target.value}>
                <option value="local" ?selected=${this.activeTimezone === 'local'}>Mi Hora</option>
                <option value="host" ?selected=${this.activeTimezone === 'host'}>Hora ${tzCity}</option>
              </select>
            </div>
          ` : ''}
          ${this.role === 'provider' && this.view === 'day'
            ? html`<button class="btn btn-primary" @click=${this.handleBlockDayAction} style="margin-right: 8px;">${isCurrentDayBlocked ? 'Liberar Día' : 'Bloquear Día'}</button>`
            : ''}
          <button class="btn" @click=${() => this.darkMode = !this.darkMode} style="margin-right: 8px;">${this.darkMode ? '☀️' : '🌙'}</button>
          <div class="btn-group">
            <button class="btn ${this.view === 'month' ? 'active' : ''}" @click=${() => this.view = 'month'}>Mes</button>
            <button class="btn ${this.view === 'week' ? 'active' : ''}" @click=${() => this.view = 'week'}>Semana</button>
            <button class="btn ${this.view === 'day' ? 'active' : ''}" @click=${() => this.view = 'day'}>Día</button>
          </div>
        </div>
      </div>

      <div class="calendar-body">
        ${this.view === 'month'
          ? html`<glatam-calendar-month-view .days=${generateMonthDays(y, m, this.localRules, this.slots, this.startOfWeekDay)} .locale=${this.locale} .startOfWeekDay=${this.startOfWeekDay} .role=${this.role} .size=${this.size} .minDate=${this.minDate || (this.role === 'buyer' ? new Date().toISOString().split('T')[0] : '')} .maxDate=${this.maxDate} .showNeighboringMonth=${this.showNeighboringMonth} .tileClassName=${this.tileClassName} @day-select=${this.handleDaySelect}></glatam-calendar-month-view>`
          : this.view === 'week'
          ? html`<glatam-calendar-week-view .days=${mapDays(generateWeekDays(this.activeDate, this.localRules, this.slots, this.startOfWeekDay))} .slots=${displaySlots} .locale=${this.locale} .selectedRange=${this.selectedRange} .role=${this.role} @range-select=${this.handleRangeSelect} @slot-click=${this.handleSlotClick}></glatam-calendar-week-view>`
          : html`<glatam-calendar-day-view .day=${mapDays(generateWeekDays(this.activeDate, this.localRules, this.slots, this.startOfWeekDay)).find(d => d.dateString === formatISODate(this.activeDate)) || null} .slots=${displaySlots} .locale=${this.locale} .selectedRange=${this.selectedRange} .role=${this.role} @range-select=${this.handleRangeSelect} @slot-click=${this.handleSlotClick}></glatam-calendar-day-view>`}
      </div>

      <glatam-calendar-modal
        .open=${this.modalOpen} .dateString=${this.modalDateString} .startTime=${this.modalStartTime} .endTime=${this.modalEndTime}
        .isRange=${this.modalIsRange} .existingRule=${this.modalExistingRule} @save-rule=${this.handleSaveRule}
        @delete-rule=${this.handleDeleteRule} @close=${() => this.modalOpen = false}
      ></glatam-calendar-modal>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'glatam-calendar': GlatamCalendar; }
}
