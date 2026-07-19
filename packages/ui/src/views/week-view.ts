import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { CalendarDay, TimeSlot } from '@glatam/calendar-core';

@customElement('glatam-calendar-week-view')
export class GlatamCalendarWeekView extends LitElement {
  static styles = css`
    :host {
      display: grid; grid-template-columns: var(--glatam-time-col-width) repeat(7, 1fr); gap: 2px;
      width: 100%; background-color: var(--glatam-border); border: 1px solid var(--glatam-border);
      border-radius: var(--glatam-grid-border-radius); overflow: hidden; user-select: none;
    }
    @media (max-width: 600px) {
      :host {
        grid-template-columns: 40px repeat(7, 1fr);
        overflow-x: hidden;
      }
      .slot-cell {
        font-size: 0.65rem;
      }
      .slot-cell.blocked, .slot-cell.selected {
        font-size: 0;
        padding: 0;
      }
      .time-slot-label {
        font-size: 0.65rem;
      }
      .header-cell {
        font-size: 0.7rem;
      }
      .header-cell .day-num {
        font-size: 0.8rem;
      }
    }
    .time-col { background-color: var(--glatam-surface); display: flex; flex-direction: column; }
    .day-col { background-color: var(--glatam-bg); display: flex; flex-direction: column; }
    .header-cell {
      height: 60px; display: flex; flex-direction: column; align-items: center; justify-content: center;
      background-color: var(--glatam-surface); border-bottom: 2px solid var(--glatam-border);
      font-size: 0.8rem; font-weight: 500; text-transform: capitalize;
    }
    .header-cell.today { color: var(--glatam-primary); font-weight: 700; }
    .header-cell .day-num { font-size: 0.95rem; font-weight: 600; margin-top: 2px; }
    .slot-cell {
      height: var(--glatam-slot-height); border-bottom: 1px solid var(--glatam-border);
      display: flex; align-items: center; justify-content: center; font-size: 0.75rem;
      cursor: pointer; transition: background-color var(--glatam-transition-fast); position: relative;
    }
    .time-slot-label { font-size: 0.7rem; color: var(--glatam-text-secondary); }
    .slot-cell.available:hover { background-color: var(--glatam-surface); }
    .slot-cell.blocked {
      background-color: var(--glatam-blocked-bg);
      background-image: repeating-linear-gradient(45deg, transparent, transparent 5px, var(--glatam-blocked-stripe) 5px, var(--glatam-blocked-stripe) 10px);
      color: var(--glatam-blocked-text); cursor: not-allowed; font-weight: 600; padding: 0 4px;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-align: center;
    }
    .slot-cell.selected { background-color: var(--glatam-selection-bg); border-left: 3px solid var(--glatam-selection-border); }
    .slot-cell.drag-selecting { background-color: var(--glatam-primary-light); }
  `;

  @property({ type: Array }) days: CalendarDay[] = [];
  @property({ type: Array }) slots: TimeSlot[] = [];
  @property({ type: String }) locale = 'es';
  @property({ type: Object }) selectedRange: { dateString: string; start: string; end: string } | null = null;
  @property({ type: String }) role = 'provider';

  @state() private isDragging = false;
  @state() private dragDayIndex: number | null = null;
  @state() private dragStartSlotIndex: number | null = null;
  @state() private dragEndSlotIndex: number | null = null;

  connectedCallback() { super.connectedCallback(); window.addEventListener('mouseup', this.handleMouseUp); }
  disconnectedCallback() { window.removeEventListener('mouseup', this.handleMouseUp); super.disconnectedCallback(); }

  private handleMouseDown(dayIndex: number, slotIndex: number, isBlocked: boolean) {
    if (isBlocked) {
      if (this.role === 'buyer') return;
      this.dispatchEvent(new CustomEvent('slot-click', {
        detail: { dateString: this.days[dayIndex].dateString, slot: this.days[dayIndex].slots[slotIndex], isBlocked: true },
        bubbles: true, composed: true
      }));
      return;
    }
    this.isDragging = true; this.dragDayIndex = dayIndex; this.dragStartSlotIndex = slotIndex; this.dragEndSlotIndex = slotIndex;
  }

  private handleMouseEnter(dayIndex: number, slotIndex: number, isBlocked: boolean) {
    if (this.isDragging && dayIndex === this.dragDayIndex && !isBlocked) this.dragEndSlotIndex = slotIndex;
  }

  private handleMouseUp = () => {
    if (!this.isDragging || this.dragDayIndex === null || this.dragStartSlotIndex === null || this.dragEndSlotIndex === null) {
      this.isDragging = false; return;
    }
    this.isDragging = false;
    const startIdx = Math.min(this.dragStartSlotIndex, this.dragEndSlotIndex);
    const endIdx = Math.max(this.dragStartSlotIndex, this.dragEndSlotIndex);
    const day = this.days[this.dragDayIndex], rangeSlots = day.slots.slice(startIdx, endIdx + 1);
    if (!rangeSlots.some(s => s.isBlocked)) {
      this.dispatchEvent(new CustomEvent('range-select', {
        detail: { dateString: day.dateString, start: rangeSlots[0].start, end: rangeSlots[rangeSlots.length - 1].end },
        bubbles: true, composed: true
      }));
    }
    this.dragDayIndex = null; this.dragStartSlotIndex = null; this.dragEndSlotIndex = null;
  };

  private isSlotSelected(dayString: string, slot: TimeSlot): boolean {
    if (!this.selectedRange || this.selectedRange.dateString !== dayString) return false;
    return slot.start >= this.selectedRange.start && slot.end <= this.selectedRange.end;
  }

  private isSlotDragSelecting(dayIndex: number, slotIndex: number): boolean {
    if (!this.isDragging || dayIndex !== this.dragDayIndex) return false;
    const start = Math.min(this.dragStartSlotIndex!, this.dragEndSlotIndex!), end = Math.max(this.dragStartSlotIndex!, this.dragEndSlotIndex!);
    return slotIndex >= start && slotIndex <= end;
  }

  render() {
    const todayStr = new Date().toISOString().split('T')[0];

    return html`
      <div class="time-col">
        <div class="header-cell">Hora</div>
        ${this.slots.map(slot => html`<div class="slot-cell time-slot-label">${slot.start}</div>`)}
      </div>

      ${this.days.map((day, dIdx) => {
        const isToday = day.dateString === todayStr, dayLabel = new Intl.DateTimeFormat(this.locale, { weekday: 'short' }).format(day.date);
        return html`
          <div class="day-col">
            <div class="header-cell ${isToday ? 'today' : ''}">
              <div>${dayLabel}</div>
              <div class="day-num">${day.dayNumber}</div>
            </div>
            
            ${day.slots.map((slot, sIdx) => {
              const blocked = slot.isBlocked, selected = this.isSlotSelected(day.dateString, slot), dragSelecting = this.isSlotDragSelecting(dIdx, sIdx);
              return html`
                <div
                  class=${classMap({
                    'slot-cell': true, 'available': !blocked, 'blocked': blocked, 'selected': selected, 'drag-selecting': dragSelecting
                  })}
                  @mousedown=${() => this.handleMouseDown(dIdx, sIdx, blocked)}
                  @mouseenter=${() => this.handleMouseEnter(dIdx, sIdx, blocked)}
                  title=${blocked && slot.rule?.description ? slot.rule.description : ''}
                >
                  ${blocked ? (slot.rule?.description || 'Ocupado') : selected ? 'Reservado' : ''}
                </div>
              `;
            })}
          </div>
        `;
      })}
    `;
  }
}
