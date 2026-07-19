import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { CalendarDay, TimeSlot } from '@glatam/calendar-core';

@customElement('glatam-calendar-day-view')
export class GlatamCalendarDayView extends LitElement {
  static styles = css`
    :host {
      display: grid; grid-template-columns: var(--glatam-time-col-width) 1fr; gap: 2px;
      width: 100%; background-color: var(--glatam-border); border: 1px solid var(--glatam-border);
      border-radius: var(--glatam-grid-border-radius); overflow: hidden; user-select: none;
    }
    .time-col { background-color: var(--glatam-surface); display: flex; flex-direction: column; }
    .day-col { background-color: var(--glatam-bg); display: flex; flex-direction: column; }
    .header-cell {
      height: 60px; display: flex; flex-direction: column; align-items: center; justify-content: center;
      background-color: var(--glatam-surface); border-bottom: 2px solid var(--glatam-border);
      font-size: 0.875rem; font-weight: 500;
    }
    .header-cell.today { color: var(--glatam-primary); font-weight: 700; }
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
      color: var(--glatam-blocked-text); cursor: not-allowed; font-weight: 600; padding: 0 10px;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .slot-cell.selected { background-color: var(--glatam-selection-bg); border-left: 3px solid var(--glatam-selection-border); }
    .slot-cell.drag-selecting { background-color: var(--glatam-primary-light); }
  `;

  @property({ type: Object }) day: CalendarDay | null = null;
  @property({ type: Array }) slots: TimeSlot[] = [];
  @property({ type: String }) locale = 'es';
  @property({ type: Object }) selectedRange: { dateString: string; start: string; end: string } | null = null;
  @property({ type: String }) role = 'provider';

  @state() private isDragging = false;
  @state() private dragStartSlotIndex: number | null = null;
  @state() private dragEndSlotIndex: number | null = null;

  connectedCallback() { super.connectedCallback(); window.addEventListener('mouseup', this.handleMouseUp); }
  disconnectedCallback() { window.removeEventListener('mouseup', this.handleMouseUp); super.disconnectedCallback(); }

  private handleMouseDown(slotIndex: number, isBlocked: boolean) {
    if (isBlocked && this.day) {
      if (this.role === 'buyer') return;
      this.dispatchEvent(new CustomEvent('slot-click', {
        detail: { dateString: this.day.dateString, slot: this.day.slots[slotIndex], isBlocked: true },
        bubbles: true, composed: true
      }));
      return;
    }
    this.isDragging = true; this.dragStartSlotIndex = slotIndex; this.dragEndSlotIndex = slotIndex;
  }

  private handleMouseEnter(slotIndex: number, isBlocked: boolean) {
    if (this.isDragging && !isBlocked) this.dragEndSlotIndex = slotIndex;
  }

  private handleMouseUp = () => {
    if (!this.isDragging || !this.day || this.dragStartSlotIndex === null || this.dragEndSlotIndex === null) {
      this.isDragging = false; return;
    }
    this.isDragging = false;
    const startIdx = Math.min(this.dragStartSlotIndex, this.dragEndSlotIndex);
    const endIdx = Math.max(this.dragStartSlotIndex, this.dragEndSlotIndex);
    const rangeSlots = this.day.slots.slice(startIdx, endIdx + 1);
    if (!rangeSlots.some(s => s.isBlocked)) {
      this.dispatchEvent(new CustomEvent('range-select', {
        detail: { dateString: this.day.dateString, start: rangeSlots[0].start, end: rangeSlots[rangeSlots.length - 1].end },
        bubbles: true, composed: true
      }));
    }
    this.dragStartSlotIndex = null; this.dragEndSlotIndex = null;
  };

  private isSlotSelected(slot: TimeSlot): boolean {
    if (!this.day || !this.selectedRange || this.selectedRange.dateString !== this.day.dateString) return false;
    return slot.start >= this.selectedRange.start && slot.end <= this.selectedRange.end;
  }

  private isSlotDragSelecting(slotIndex: number): boolean {
    if (!this.isDragging) return false;
    const start = Math.min(this.dragStartSlotIndex!, this.dragEndSlotIndex!), end = Math.max(this.dragStartSlotIndex!, this.dragEndSlotIndex!);
    return slotIndex >= start && slotIndex <= end;
  }

  render() {
    if (!this.day) return html`<div>Cargando...</div>`;
    const isToday = this.day.dateString === new Date().toISOString().split('T')[0];
    const formattedDate = new Intl.DateTimeFormat(this.locale, { weekday: 'long', day: 'numeric', month: 'long' }).format(this.day.date);

    return html`
      <div class="time-col">
        <div class="header-cell">Hora</div>
        ${this.slots.map(slot => html`<div class="slot-cell time-slot-label">${slot.start}</div>`)}
      </div>

      <div class="day-col">
        <div class="header-cell ${isToday ? 'today' : ''}">
          <div style="text-transform: capitalize;">${formattedDate}</div>
        </div>

        ${this.day.slots.map((slot, sIdx) => {
          const blocked = slot.isBlocked, selected = this.isSlotSelected(slot), dragSelecting = this.isSlotDragSelecting(sIdx);
          return html`
            <div
              class=${classMap({
                'slot-cell': true, 'available': !blocked, 'blocked': blocked, 'selected': selected, 'drag-selecting': dragSelecting
              })}
              @mousedown=${() => this.handleMouseDown(sIdx, blocked)}
              @mouseenter=${() => this.handleMouseEnter(sIdx, blocked)}
              title=${blocked && slot.rule?.description ? slot.rule.description : ''}
            >
              ${blocked ? (slot.rule?.description || 'Ocupado') : selected ? 'Reservado' : ''}
            </div>
          `;
        })}
      </div>
    `;
  }
}
