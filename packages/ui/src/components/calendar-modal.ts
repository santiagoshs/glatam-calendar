import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BlockingRule } from '@glatam/calendar-core';

@customElement('glatam-calendar-modal')
export class GlatamCalendarModal extends LitElement {
  static styles = css`
    .modal-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.35);
      backdrop-filter: blur(10px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      opacity: 0; pointer-events: none;
      transition: opacity var(--glatam-transition-normal);
    }
    .modal-overlay.open {
      opacity: 1; pointer-events: auto;
    }
    .modal-content {
      background: var(--glatam-bg);
      color: var(--glatam-text);
      border-radius: 24px;
      padding: 28px;
      width: 90%;
      max-width: 400px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
      border: 1px solid var(--glatam-border);
      transform: scale(0.92) translateY(10px);
      transition: transform var(--glatam-transition-normal), background-color var(--glatam-transition-normal);
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    .modal-overlay.open .modal-content {
      transform: scale(1) translateY(0);
    }
    h3 { margin: 0; font-size: 1.3rem; font-weight: 700; letter-spacing: -0.02em; }
    .form-group { display: flex; flex-direction: column; gap: 6px; }
    label { font-size: 0.8rem; color: var(--glatam-text-secondary); font-weight: 600; }
    input[type="text"] {
      background: var(--glatam-surface);
      border: 1px solid var(--glatam-border);
      border-radius: 10px;
      padding: 10px 14px;
      color: var(--glatam-text);
      font-family: inherit;
      font-size: 0.9rem;
      outline: none;
      transition: border-color var(--glatam-transition-fast);
    }
    input[type="text"]:focus {
      border-color: var(--glatam-primary);
    }
    .switch-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 4px 0;
    }
    
    /* Apple Switch Style */
    .switch {
      position: relative;
      display: inline-block;
      width: 46px;
      height: 26px;
    }
    .switch input { opacity: 0; width: 0; height: 0; }
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0; left: 0; right: 0; bottom: 0;
      background-color: var(--glatam-border);
      transition: .25s cubic-bezier(0.16, 1, 0.3, 1);
      border-radius: 26px;
    }
    .slider:before {
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: .25s cubic-bezier(0.16, 1, 0.3, 1);
      border-radius: 50%;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
    }
    input:checked + .slider {
      background-color: var(--glatam-primary);
    }
    input:checked + .slider:before {
      transform: translateX(20px);
    }

    .days-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 6px;
      margin-top: 4px;
    }
    .day-btn {
      width: 36px;
      height: 36px;
      margin: 0 auto;
      border-radius: 50%;
      border: 1px solid var(--glatam-border);
      background: var(--glatam-bg);
      color: var(--glatam-text);
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color var(--glatam-transition-fast), color var(--glatam-transition-fast), border-color var(--glatam-transition-fast);
    }
    .day-btn:hover {
      background-color: var(--glatam-surface);
    }
    .day-btn.selected {
      background: var(--glatam-primary);
      color: var(--glatam-text-light);
      border-color: var(--glatam-primary);
    }
    .btn-actions { display: flex; gap: 10px; margin-top: 10px; justify-content: flex-end; }
    .btn {
      padding: 10px 18px;
      border-radius: 20px;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      border: none;
      transition: opacity var(--glatam-transition-fast), transform var(--glatam-transition-fast);
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .btn:active { transform: scale(0.97); }
    .btn-cancel { background: transparent; color: var(--glatam-text); border: 1px solid var(--glatam-border); }
    .btn-cancel:hover { background-color: var(--glatam-surface); }
    .btn-save { background: var(--glatam-primary); color: var(--glatam-text-light); }
    .btn-save:hover { opacity: 0.95; }
    .btn-danger {
      background: rgba(255, 69, 58, 0.12);
      color: #ff453a;
      margin-right: auto;
    }
    .btn-danger:hover {
      background: rgba(255, 69, 58, 0.18);
    }
  `;

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

  private toggleDay(dayNum: number) {
    const idx = this.selectedDays.indexOf(dayNum);
    if (idx > -1) {
      this.selectedDays = this.selectedDays.filter(d => d !== dayNum);
    } else {
      this.selectedDays = [...this.selectedDays, dayNum];
    }
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
      <div class=${classMap({ 'modal-overlay': true, 'open': this.open })}>
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
      </div>
    `;
  }
}
