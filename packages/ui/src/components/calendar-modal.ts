import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { BlockingRule } from '@glatam/calendar-core';
import { modalStyles } from '../styles/calendar-modal.css.js';

@customElement('glatam-calendar-modal')
export class GlatamCalendarModal extends LitElement {
  static styles = modalStyles;

  @property({ type: Boolean }) open = false;
  @property({ type: String }) dateString = '';
  @property({ type: String }) startTime = '';
  @property({ type: String }) endTime = '';
  @property({ type: Boolean }) isRange = false;
  @property({ type: Object }) existingRule: BlockingRule | null = null;

  @state() private description = '';
  @state() private blockAllDay = true;
  @state() private isRecurring = false;
  @state() private selectedDays: number[] = [];

  willUpdate(changedProperties: Map<string, any>) {
    if (changedProperties.has('open') && this.open) {
      if (this.existingRule) {
        this.description = 'Bloqueo';
        this.blockAllDay = !this.existingRule.slots || this.existingRule.slots.length === 0;
        this.isRecurring = this.existingRule.type === 'weekly';
        this.selectedDays = this.existingRule.daysOfWeek || [];
      } else {
        this.description = '';
        this.blockAllDay = !this.isRange;
        this.isRecurring = false;
        this.selectedDays = [new Date(this.dateString + 'T00:00:00').getDay()];
      }
    }
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('open')) {
      const dialog = this.shadowRoot?.getElementById('booking-dialog') as HTMLDialogElement;
      if (dialog) {
        if (this.open) {
          if (!dialog.open) dialog.showModal();
        } else {
          if (dialog.open) dialog.close();
        }
      }
    }
  }

  private handleDialogClose() {
    if (this.open) {
      this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
    }
  }

  private toggleDay(dayNum: number) {
    const idx = this.selectedDays.indexOf(dayNum);
    this.selectedDays = idx > -1 ? this.selectedDays.filter(d => d !== dayNum) : [...this.selectedDays, dayNum];
  }

  private handleSave() {
    const detail = {
      title: this.description || 'Bloqueo',
      blockAllDay: this.blockAllDay,
      isRecurring: this.isRecurring,
      selectedDays: this.selectedDays,
      dateString: this.dateString,
      startTime: this.startTime,
      endTime: this.endTime
    };
    this.dispatchEvent(new CustomEvent('save-rule', { detail, bubbles: true, composed: true }));
  }

  private handleDelete() {
    if (this.existingRule) {
      this.dispatchEvent(new CustomEvent('delete-rule', {
        detail: { id: this.existingRule.id },
        bubbles: true,
        composed: true
      }));
    }
  }

  render() {
    const weekLabels = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
    const formattedSelection = this.isRange 
      ? `${this.dateString} (${this.startTime} - ${this.endTime})`
      : this.dateString;

    return html`
      <dialog id="booking-dialog" @close=${this.handleDialogClose}>
        <div class="modal-content">
          <h3>${this.existingRule ? 'Gestionar Bloqueo' : 'Crear Bloqueo'}</h3>
          
          <div style="font-size: 0.85rem; color: var(--glatam-text-secondary);">
            Selección: <strong>${formattedSelection}</strong>
          </div>

          <div class="form-group">
            <label>Descripción / Nota</label>
            <input 
              type="text" 
              .value=${this.description} 
              @input=${(e: any) => this.description = e.target.value}
              placeholder="Ej. Reunión de equipo, Vacaciones" 
            />
          </div>

          <div class="switch-row">
            <label>Bloquear todo el día</label>
            <label class="switch">
              <input 
                type="checkbox" 
                .checked=${this.blockAllDay} 
                @change=${(e: any) => this.blockAllDay = e.target.checked}
              />
              <span class="slider"></span>
            </label>
          </div>

          <div class="switch-row">
            <label>Repetir semanalmente</label>
            <label class="switch">
              <input 
                type="checkbox" 
                .checked=${this.isRecurring} 
                @change=${(e: any) => this.isRecurring = e.target.checked}
              />
              <span class="slider"></span>
            </label>
          </div>

          ${this.isRecurring 
            ? html`
                <div class="form-group">
                  <label>Repetir los días</label>
                  <div class="days-grid">
                    ${[1, 2, 3, 4, 5, 6, 0].map(day => html`
                      <button 
                        class="day-btn ${this.selectedDays.includes(day) ? 'selected' : ''}"
                        @click=${() => this.toggleDay(day)}
                      >
                        ${weekLabels[day]}
                      </button>
                    `)}
                  </div>
                </div>
              `
            : ''}

          <div class="btn-actions">
            ${this.existingRule 
              ? html`<button class="btn btn-danger" @click=${this.handleDelete}>Eliminar</button>` 
              : ''}
            <button class="btn btn-cancel" @click=${() => this.dispatchEvent(new CustomEvent('close'))}>Cancelar</button>
            <button class="btn btn-save" @click=${this.handleSave}>Guardar</button>
          </div>
        </div>
      </dialog>
    `;
  }
}
