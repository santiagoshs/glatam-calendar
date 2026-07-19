import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { CalendarDay } from '@glatam/calendar-core';

@customElement('glatam-calendar-month-view')
export class GlatamCalendarMonthView extends LitElement {
  static styles = css`
    :host { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 6px; width: 100%; }
    .weekday { font-size: 0.75rem; font-weight: 600; color: var(--glatam-text-secondary); text-transform: uppercase; text-align: center; padding: 8px 0; letter-spacing: 0.05em; }
    .day-cell {
      min-height: var(--glatam-day-min-height); border: 1px solid var(--glatam-border); border-radius: var(--glatam-grid-border-radius);
      padding: 8px; display: flex; flex-direction: column; justify-content: space-between; cursor: pointer;
      transition: background-color var(--glatam-transition-fast), border-color var(--glatam-transition-fast); background-color: var(--glatam-bg); position: relative;
    }
    .day-cell:hover:not(.blocked):not(.disabled) { background-color: var(--glatam-surface); border-color: var(--glatam-text-secondary); }
    .day-cell.padding { opacity: 0.4; }
    .day-cell.blocked {
      background: repeating-linear-gradient(45deg, var(--glatam-blocked-bg), var(--glatam-blocked-bg) 10px, var(--glatam-blocked-stripe) 10px, var(--glatam-blocked-stripe) 20px);
      border-color: var(--glatam-blocked-border); color: var(--glatam-blocked-text); cursor: not-allowed;
    }
    .day-cell.today { background-color: var(--glatam-today-bg); border-color: var(--glatam-primary); }
    .day-cell.selected { background-color: var(--glatam-selection-bg); border-color: var(--glatam-selection-border); box-shadow: inset 0 0 0 1px var(--glatam-selection-border); }
    .day-cell.disabled { opacity: 0.2; cursor: not-allowed; background-color: var(--glatam-surface); border-color: var(--glatam-border); pointer-events: none; }
    .day-cell.empty { border: none; background: transparent; cursor: default; pointer-events: none; }
    .day-number { font-size: 0.875rem; font-weight: 500; margin-bottom: 4px; }
    .day-cell.today .day-number { color: var(--glatam-today-text); font-weight: 700; }
    .slot-indicator { display: flex; flex-direction: column; gap: 3px; font-size: 0.7rem; overflow: hidden; margin-top: 4px; }
    .badge { padding: 2px 6px; border-radius: 4px; font-weight: 500; text-align: center; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; }
    .badge.blocked-day { background-color: rgba(255, 69, 58, 0.12); color: #ff453a; font-weight: 600; }
    .badge.blocked-slot { background-color: var(--glatam-surface); border: 1px solid var(--glatam-border); color: var(--glatam-text-secondary); }
    :host([size="small"]) .day-cell { min-height: 38px; padding: 4px; justify-content: center; align-items: center; }
    :host([size="small"]) .slot-indicator { display: none; }
    :host([size="small"]) .day-number { margin-bottom: 0; font-size: 0.8rem; }
    @media (max-width: 600px) {
      .day-cell { min-height: 38px; padding: 4px; justify-content: center; align-items: center; }
      .slot-indicator { display: none; }
      .day-number { margin-bottom: 0; font-size: 0.8rem; }
    }
  `;

  @property({ type: Array }) days: CalendarDay[] = [];
  @property({ type: String }) locale = 'es';
  @property({ type: Number }) startOfWeekDay = 0;
  @property({ type: Array }) selectedDates: string[] = [];
  @property({ type: String }) role = 'provider';
  @property({ type: String, reflect: true }) size = 'medium';
  @property({ type: String }) minDate = '';
  @property({ type: String }) maxDate = '';
  @property({ type: Boolean }) showNeighboringMonth = true;
  @property({ attribute: false }) tileClassName: ((data: { date: Date; dateString: string }) => string) | null = null;

  private getWeekdayNames(): string[] {
    const names: string[] = [];
    const baseDate = new Date(2026, 6, 12 + this.startOfWeekDay); 
    const formatter = new Intl.DateTimeFormat(this.locale, { weekday: 'short' });
    for (let i = 0; i < 7; i++) {
      names.push(formatter.format(baseDate));
      baseDate.setDate(baseDate.getDate() + 1);
    }
    return names;
  }

  private handleDayClick(day: CalendarDay) {
    if (this.role === 'buyer' && day.isBlocked) return;
    this.dispatchEvent(new CustomEvent('day-select', {
      detail: { dateString: day.dateString, isBlocked: day.isBlocked },
      bubbles: true, composed: true
    }));
  }

  render() {
    const weekdayNames = this.getWeekdayNames();
    
    return html`
      ${weekdayNames.map(name => html`<div class="weekday">${name}</div>`)}
      
      ${this.days.map(day => {
        if (!day.isCurrentMonth && !this.showNeighboringMonth) {
          return html`<div class="day-cell empty"></div>`;
        }
        
        const isToday = day.dateString === new Date().toISOString().split('T')[0];
        const isSelected = this.selectedDates.includes(day.dateString);
        const blockedSlots = day.slots.filter(s => s.isBlocked);
        const isDisabled = (this.minDate && day.dateString < this.minDate) || (this.maxDate && day.dateString > this.maxDate);
        const customClass = this.tileClassName ? this.tileClassName({ date: day.date, dateString: day.dateString }) : '';
        
        return html`
          <div 
            class=${classMap({
              'day-cell': true, 'padding': !day.isCurrentMonth, 'blocked': day.isBlocked, 'today': isToday, 'selected': isSelected, 'disabled': !!isDisabled, [customClass]: !!customClass
            })}
            part="day-cell ${customClass}"
            @click=${() => this.handleDayClick(day)}
          >
            <div class="day-number">${day.dayNumber}</div>
            
            <div class="slot-indicator">
              ${day.isBlocked
                ? html`<div class="badge blocked-day">${day.rule?.description || 'Bloqueado'}</div>`
                : blockedSlots.slice(0, 2).map(slot => html`
                    <div class="badge blocked-slot" title=${slot.rule?.description || ''}>
                      🚫 ${slot.rule?.description || slot.start}
                    </div>
                  `)}
              ${!day.isBlocked && blockedSlots.length > 2 
                ? html`<div style="text-align: center; font-size: 0.65rem; color: var(--glatam-text-secondary);">+${blockedSlots.length - 2} tareas</div>` 
                : ''}
            </div>
          </div>
        `;
      })}
    `;
  }
}
