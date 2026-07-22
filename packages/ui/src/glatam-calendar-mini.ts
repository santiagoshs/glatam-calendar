import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  generateMonthDays,
  isTimeBlocked,
  BlockingRule,
  TimeSlot
} from '@glatam/calendar-core';
import { variablesStyles } from './styles/variables.css.js';
import { calendarStyles } from './styles/calendar.css.js';
import { getTimezoneOffsetDiff, shiftSlot } from './utils/timezone-utils.js';

import './views/month-view.js';

@customElement('glatam-calendar-mini')
export class GlatamCalendarMini extends LitElement {
  static styles = [
    variablesStyles,
    calendarStyles,
    css`
      :host {
        display: inline-block;
        background: transparent;
        border: none;
        padding: 0;
        box-shadow: none;
        width: 100%;
      }

      .mini-calendar-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 4px 8px;
        margin-bottom: 8px;
        user-select: none;
      }

      .mini-month-title {
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--glatam-text);
        text-transform: capitalize;
        letter-spacing: -0.01em;
      }

      .mini-nav-btn {
        background: transparent;
        border: 1px solid var(--glatam-border);
        border-radius: 8px;
        color: var(--glatam-text);
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 0.75rem;
        transition: background-color var(--glatam-transition-fast), border-color var(--glatam-transition-fast), transform var(--glatam-transition-fast);
      }

      .mini-nav-btn:hover:not(:disabled) {
        background-color: var(--glatam-surface);
        border-color: var(--glatam-text-secondary);
      }

      .mini-nav-btn:active:not(:disabled) {
        transform: scale(0.95);
      }
    `
  ];

  @property({ type: String }) role = 'buyer'; // Default to buyer for checkout
  @property({ type: String }) locale = 'es';
  @property({ type: Number }) startOfWeekDay = 0;
  @property({ type: Array }) rules: BlockingRule[] = [];
  @property({ type: Object }) selectedRange: { dateString: string; start: string; end: string } | null = null;
  @property({ type: String, reflect: true }) size = 'medium';
  @property({ type: String }) hostTimezone = 'America/Bogota'; @property({ type: String }) activeTimezone = 'local';
  @property({ type: String }) minDate = ''; @property({ type: String }) maxDate = '';
  @property({ type: Boolean }) showNeighboringMonth = true;
  @property({ attribute: false }) tileClassName: ((data: { date: Date; dateString: string }) => string) | null = null;
  @property({ type: Array }) slots: TimeSlot[] = [
    { start: '09:00', end: '10:00' }, { start: '10:00', end: '11:00' },
    { start: '11:00', end: '12:00' }, { start: '12:00', end: '13:00' },
    { start: '13:00', end: '14:00' }, { start: '14:00', end: '15:00' },
    { start: '15:00', end: '16:00' }, { start: '16:00', end: '17:00' },
    { start: '17:00', end: '18:00' },
  ];

  @state() private activeDate = new Date();
  @state() private dropdownOpen = false;
  @state() private dropdownSelectedDateString = '';

  private touchStartX = 0;
  private touchStartY = 0;

  private handlePrevMonth(e: Event) {
    e.stopPropagation();
    const prev = new Date(this.activeDate);
    prev.setMonth(prev.getMonth() - 1);
    this.activeDate = prev;
  }

  private handleNextMonth(e: Event) {
    e.stopPropagation();
    const next = new Date(this.activeDate);
    next.setMonth(next.getMonth() + 1);
    this.activeDate = next;
  }

  private handleTouchStart(e: TouchEvent) {
    if (e.touches && e.touches.length > 0) {
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
    }
  }

  private handleTouchEnd(e: TouchEvent) {
    if (e.changedTouches && e.changedTouches.length > 0) {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = this.touchStartX - touchEndX;
      const diffY = this.touchStartY - touchEndY;

      if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
          this.handleNextMonth(e);
        } else {
          this.handlePrevMonth(e);
        }
      }
    }
  }

  private getFormattedMonthTitle(): string {
    const formatted = this.activeDate.toLocaleDateString(this.locale || 'es', { month: 'long', year: 'numeric' });
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }

  private handleDropdownDaySelect(e: CustomEvent<{ dateString: string }>) {
    this.dropdownSelectedDateString = e.detail.dateString;
  }

  private selectDropdownSlot(slot: TimeSlot & { displayStart: string; displayEnd: string; isBlocked: boolean }) {
    const detail = {
      dateString: this.dropdownSelectedDateString,
      start: slot.displayStart,
      end: slot.displayEnd,
      hostStart: slot.start,
      hostEnd: slot.end
    };
    this.selectedRange = { dateString: this.dropdownSelectedDateString, start: slot.displayStart, end: slot.displayEnd };
    this.dispatchEvent(new CustomEvent('booking-selected', { detail, bubbles: true, composed: true }));
    this.dropdownOpen = false;
    this.dropdownSelectedDateString = '';
  }

  render() {
    const label = this.selectedRange
      ? `Reserva: ${this.selectedRange.dateString} (${this.selectedRange.start} - ${this.selectedRange.end})`
      : 'Seleccionar Fecha y Hora';

    const y = this.activeDate.getFullYear(), m = this.activeDate.getMonth();
    const dropdownDate = this.dropdownSelectedDateString ? new Date(this.dropdownSelectedDateString + 'T00:00:00') : null;
    const offset = dropdownDate && this.activeTimezone === 'local' ? getTimezoneOffsetDiff(dropdownDate, this.hostTimezone, 'local') : 0;
    
    const dropdownSlots = dropdownDate
      ? this.slots.map(slot => {
          const isBlocked = isTimeBlocked(dropdownDate, slot, this.rules);
          const shifted = shiftSlot(slot, offset);
          const suffix = shifted.dayShift > 0 ? ' (+1d)' : shifted.dayShift < 0 ? ' (-1d)' : '';
          return {
            ...slot,
            displayStart: shifted.start + suffix,
            displayEnd: shifted.end + suffix,
            isBlocked
          };
        })
      : [];

    return html`
      <div class="dropdown-container">
        <button class="btn btn-primary dropdown-toggle" @click=${() => this.dropdownOpen = !this.dropdownOpen}>
          <span>${label}</span> <span>${this.dropdownOpen ? '▲' : '▼'}</span>
        </button>

        ${this.dropdownOpen
          ? html`
              <div class="dropdown-card" style="--glatam-day-min-height: 38px;">
                ${!this.dropdownSelectedDateString
                  ? html`
                      <div class="mini-calendar-header">
                        <button
                          type="button"
                          class="mini-nav-btn"
                          aria-label="Mes anterior"
                          @click=${this.handlePrevMonth}
                        >
                          &lt;
                        </button>
                        <span class="mini-month-title">
                          ${this.getFormattedMonthTitle()}
                        </span>
                        <button
                          type="button"
                          class="mini-nav-btn"
                          aria-label="Mes siguiente"
                          @click=${this.handleNextMonth}
                        >
                          &gt;
                        </button>
                      </div>
                      <div
                        class="mini-calendar-touch-wrapper"
                        @touchstart=${this.handleTouchStart}
                        @touchend=${this.handleTouchEnd}
                      >
                        <glatam-calendar-month-view
                          .days=${generateMonthDays(y, m, this.rules, this.slots, this.startOfWeekDay)}
                          .locale=${this.locale}
                          .startOfWeekDay=${this.startOfWeekDay}
                          .role=${this.role}
                          size="small"
                          .minDate=${this.minDate}
                          .maxDate=${this.maxDate}
                          .showNeighboringMonth=${this.showNeighboringMonth}
                          .tileClassName=${this.tileClassName}
                          @day-select=${this.handleDropdownDaySelect}
                        ></glatam-calendar-month-view>
                      </div>
                    `
                  : html`
                      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid var(--glatam-border); padding-bottom:8px;">
                        <button class="btn" style="height:28px; padding:0 8px; font-size:0.75rem;" @click=${() => this.dropdownSelectedDateString = ''}>&lt; Volver</button>
                        <span style="font-size:0.8rem; font-weight:600; color: var(--glatam-text);">${this.dropdownSelectedDateString}</span>
                      </div>
                      <div class="slot-list">
                        ${dropdownSlots.map(s => html`
                          <button
                            class="slot-btn ${s.isBlocked ? 'blocked' : ''}"
                            ?disabled=${s.isBlocked}
                            @click=${() => this.selectDropdownSlot(s)}
                          >
                            ${s.displayStart} - ${s.displayEnd} ${s.isBlocked ? '(Ocupado)' : ''}
                          </button>
                        `)}
                      </div>
                    `}
              </div>
            `
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'glatam-calendar-mini': GlatamCalendarMini; }
}
