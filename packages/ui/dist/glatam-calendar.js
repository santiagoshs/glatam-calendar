import { css as E, LitElement as O, html as d } from "lit";
import { property as s, customElement as T, state as m } from "lit/decorators.js";
import { isTimeBlocked as M, formatISODate as N, generateMonthDays as j, generateWeekDays as _ } from "@glatam/calendar-core";
import { formatISODate as st, isTimeBlocked as lt, parseISODate as nt } from "@glatam/calendar-core";
import { classMap as I } from "lit/directives/class-map.js";
const A = E`
  :host {
    /* Fonts */
    --glatam-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    
    /* Colors - Premium Apple Light Theme */
    --glatam-primary: #5856d6;
    --glatam-primary-hover: #4745b4;
    --glatam-primary-light: rgba(88, 86, 214, 0.1);
    --glatam-primary-light-hover: rgba(88, 86, 214, 0.25);
    
    --glatam-bg: #ffffff;
    --glatam-surface: #f5f5f7;
    --glatam-border: #e5e5ea;
    --glatam-text: #1d1d1f;
    --glatam-text-secondary: #86868b;
    --glatam-text-light: #ffffff;
    
    /* Blocked/Unavailable states */
    --glatam-blocked-bg: #fcfcfd;
    --glatam-blocked-stripe: #f2f2f7;
    --glatam-blocked-text: #aeaeae;
    --glatam-blocked-border: #e5e5ea;

    /* Selection Colors */
    --glatam-selection-bg: rgba(88, 86, 214, 0.15);
    --glatam-selection-border: #5856d6;
    
    /* Today highlighting */
    --glatam-today-text: #5856d6;
    --glatam-today-bg: rgba(88, 86, 214, 0.08);
    
    /* Dimensions & Layout */
    --glatam-border-radius: 12px;
    --glatam-padding: 16px;
    --glatam-grid-border-radius: 8px;
    --glatam-day-min-height: 72px;
    --glatam-time-col-width: 60px;
    --glatam-slot-height: 48px;
    
    /* Animation duration */
    --glatam-transition-fast: 0.15s ease;
    --glatam-transition-normal: 0.25s ease;
  }

  :host(.dark-mode) {
    /* Colors - Premium Apple Dark Theme */
    --glatam-primary: #5e5ce6;
    --glatam-primary-hover: #7d7aff;
    --glatam-primary-light: rgba(94, 92, 230, 0.15);
    --glatam-primary-light-hover: rgba(94, 92, 230, 0.3);
    
    --glatam-bg: #1c1c1e;
    --glatam-surface: #2c2c2e;
    --glatam-border: #38383a;
    --glatam-text: #f5f5f7;
    --glatam-text-secondary: #8e8e93;
    
    /* Blocked/Unavailable states */
    --glatam-blocked-bg: #242426;
    --glatam-blocked-stripe: #2c2c2e;
    --glatam-blocked-text: #707074;
    --glatam-blocked-border: #38383a;

    /* Selection Colors */
    --glatam-selection-bg: rgba(94, 92, 230, 0.25);
    --glatam-selection-border: #5e5ce6;
    
    /* Today highlighting */
    --glatam-today-text: #7d7aff;
    --glatam-today-bg: rgba(94, 92, 230, 0.12);
  }

  :host([size="small"]) {
    --glatam-day-min-height: 48px;
    --glatam-slot-height: 36px;
    --glatam-time-col-width: 48px;
    --glatam-padding: 10px;
    font-size: 0.8rem;
  }

  :host([size="large"]) {
    --glatam-day-min-height: 96px;
    --glatam-slot-height: 60px;
    --glatam-time-col-width: 72px;
    --glatam-padding: 24px;
    font-size: 1.1rem;
  }
`, P = E`
  :host {
    display: grid;
    min-width: 0;
    font-family: var(--glatam-font-family);
    color: var(--glatam-text);
    background-color: var(--glatam-bg);
    border-radius: var(--glatam-border-radius);
    padding: var(--glatam-padding);
    box-shadow: 0 4px 25px rgba(0, 0, 0, 0.05);
    border: 1px solid var(--glatam-border);
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    transition: background-color var(--glatam-transition-normal), border-color var(--glatam-transition-normal);
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--glatam-padding);
    flex-wrap: wrap;
    gap: 12px;
  }

  .nav-group, .view-group {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .nav-title {
    font-size: 1.25rem;
    font-weight: 600;
    min-width: 140px;
    text-align: center;
    letter-spacing: -0.01em;
  }

  .btn {
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid var(--glatam-border);
    background-color: var(--glatam-bg);
    color: var(--glatam-text);
    cursor: pointer;
    transition: background-color var(--glatam-transition-fast), border-color var(--glatam-transition-fast), transform var(--glatam-transition-fast);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 36px;
    height: 36px;
  }

  .btn:hover:not(:disabled) {
    background-color: var(--glatam-surface);
    border-color: var(--glatam-text-secondary);
  }

  .btn:active:not(:disabled) {
    transform: scale(0.97);
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .btn-primary {
    background-color: var(--glatam-primary);
    color: var(--glatam-text-light);
    border: none;
  }

  .btn-primary:hover:not(:disabled) {
    background-color: var(--glatam-primary-hover);
  }

  .btn-group {
    display: flex;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid var(--glatam-border);
  }

  .btn-group .btn {
    border-radius: 0;
    border: none;
    border-right: 1px solid var(--glatam-border);
  }

  .btn-group .btn:last-child {
    border-right: none;
  }

  .btn-group .btn.active {
    background-color: var(--glatam-primary-light);
    color: var(--glatam-primary);
    font-weight: 600;
  }

  /* Timezone Selector Styles */
  .timezone-badge {
    font-size: 0.75rem;
    padding: 4px 8px;
    background: var(--glatam-surface);
    border: 1px solid var(--glatam-border);
    border-radius: 20px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: var(--glatam-text-secondary);
  }

  .timezone-select {
    background: transparent;
    border: none;
    color: var(--glatam-text);
    font-family: inherit;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    outline: none;
    padding-right: 4px;
  }

  /* Mini Popover Variant Styles */
  .dropdown-container {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  .dropdown-toggle {
    width: 100%;
    justify-content: space-between;
    padding: 12px 16px;
    border-radius: 12px;
    font-weight: 600;
    height: 48px;
  }

  .dropdown-card {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    width: 320px;
    background: var(--glatam-bg);
    border-radius: 16px;
    border: 1px solid var(--glatam-border);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
    z-index: 100;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    animation: fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .slot-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 220px;
    overflow-y: auto;
    padding-right: 4px;
  }

  .slot-btn {
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid var(--glatam-border);
    background: var(--glatam-bg);
    color: var(--glatam-text);
    cursor: pointer;
    font-family: inherit;
    font-size: 0.85rem;
    font-weight: 500;
    text-align: center;
    transition: background-color var(--glatam-transition-fast);
  }

  .slot-btn:hover:not(.blocked) {
    background-color: var(--glatam-surface);
    border-color: var(--glatam-text-secondary);
  }

  .slot-btn.blocked {
    background-color: var(--glatam-surface);
    color: var(--glatam-blocked-text);
    text-decoration: line-through;
    cursor: not-allowed;
    border-color: var(--glatam-border);
    opacity: 0.6;
  }

  /* Smooth Apple Animation */
  .calendar-body {
    position: relative;
    width: 100%;
    overflow-x: auto;
    animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(8px) scale(0.995);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @media (max-width: 600px) {
    :host {
      padding: 8px;
    }
    .calendar-header {
      flex-direction: column;
      align-items: stretch;
      gap: 10px;
    }
    .nav-group, .view-group {
      width: 100%;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 6px;
    }
    .nav-title {
      flex: 1;
      font-size: 1.1rem;
      min-width: unset;
      text-align: right;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .btn {
      font-size: 0.8rem;
      padding: 6px 10px;
      height: 32px;
      min-width: 32px;
    }
  }
`;
function C(e, t, a) {
  if (t === a) return 0;
  const i = (r, l) => {
    const o = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: !1
    };
    l !== "local" && (o.timeZone = l);
    const n = new Intl.DateTimeFormat("en-US", o).formatToParts(r), g = new Map(n.map((S) => [S.type, S.value])), u = Number(g.get("hour")), v = u === 24 ? 0 : u;
    return new Date(
      Number(g.get("year")),
      Number(g.get("month")) - 1,
      Number(g.get("day")),
      v,
      Number(g.get("minute")),
      Number(g.get("second"))
    );
  };
  try {
    const r = i(e, t);
    return (i(e, a).getTime() - r.getTime()) / (60 * 1e3);
  } catch {
    return 0;
  }
}
function W(e, t) {
  if (t === 0)
    return { start: e.start, end: e.end, dayShift: 0 };
  const a = (g) => {
    const [u, v] = g.split(":").map(Number);
    return u * 60 + v;
  }, i = (g) => {
    let u = g % 1440;
    u < 0 && (u += 1440);
    const v = String(Math.floor(u / 60)).padStart(2, "0"), S = String(u % 60).padStart(2, "0");
    return `${v}:${S}`;
  }, r = a(e.start), l = a(e.end), o = r + t, c = l + t;
  let n = 0;
  return o < 0 ? n = -1 : o >= 1440 && (n = 1), {
    start: i(o),
    end: i(c),
    dayShift: n
  };
}
var U = Object.defineProperty, L = Object.getOwnPropertyDescriptor, k = (e, t, a, i) => {
  for (var r = i > 1 ? void 0 : i ? L(t, a) : t, l = e.length - 1, o; l >= 0; l--)
    (o = e[l]) && (r = (i ? o(t, a, r) : o(r)) || r);
  return i && r && U(t, a, r), r;
};
let f = class extends O {
  constructor() {
    super(...arguments), this.days = [], this.locale = "es", this.startOfWeekDay = 0, this.selectedDates = [], this.role = "provider", this.size = "medium", this.minDate = "", this.maxDate = "", this.showNeighboringMonth = !0, this.tileClassName = null;
  }
  getWeekdayNames() {
    const e = [], t = new Date(2026, 6, 12 + this.startOfWeekDay), a = new Intl.DateTimeFormat(this.locale, { weekday: "short" });
    for (let i = 0; i < 7; i++)
      e.push(a.format(t)), t.setDate(t.getDate() + 1);
    return e;
  }
  handleDayClick(e) {
    this.role === "buyer" && e.isBlocked || this.dispatchEvent(new CustomEvent("day-select", {
      detail: { dateString: e.dateString, isBlocked: e.isBlocked },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    const e = this.getWeekdayNames();
    return d`
      ${e.map((t) => d`<div class="weekday">${t}</div>`)}
      
      ${this.days.map((t) => {
      var c;
      if (!t.isCurrentMonth && !this.showNeighboringMonth)
        return d`<div class="day-cell empty"></div>`;
      const a = t.dateString === (/* @__PURE__ */ new Date()).toISOString().split("T")[0], i = this.selectedDates.includes(t.dateString), r = t.slots.filter((n) => n.isBlocked), l = this.minDate && t.dateString < this.minDate || this.maxDate && t.dateString > this.maxDate, o = this.tileClassName ? this.tileClassName({ date: t.date, dateString: t.dateString }) : "";
      return d`
          <div 
            class=${I({
        "day-cell": !0,
        padding: !t.isCurrentMonth,
        blocked: t.isBlocked,
        today: a,
        selected: i,
        disabled: !!l,
        [o]: !!o
      })}
            part="day-cell ${o}"
            @click=${() => this.handleDayClick(t)}
          >
            <div class="day-number">${t.dayNumber}</div>
            
            <div class="slot-indicator">
              ${t.isBlocked ? d`<div class="badge blocked-day">${((c = t.rule) == null ? void 0 : c.description) || "Bloqueado"}</div>` : r.slice(0, 2).map((n) => {
        var g, u;
        return d`
                    <div class="badge blocked-slot" title=${((g = n.rule) == null ? void 0 : g.description) || ""}>
                      🚫 ${((u = n.rule) == null ? void 0 : u.description) || n.start}
                    </div>
                  `;
      })}
              ${!t.isBlocked && r.length > 2 ? d`<div style="text-align: center; font-size: 0.65rem; color: var(--glatam-text-secondary);">+${r.length - 2} tareas</div>` : ""}
            </div>
          </div>
        `;
    })}
    `;
  }
};
f.styles = E`
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
k([
  s({ type: Array })
], f.prototype, "days", 2);
k([
  s({ type: String })
], f.prototype, "locale", 2);
k([
  s({ type: Number })
], f.prototype, "startOfWeekDay", 2);
k([
  s({ type: Array })
], f.prototype, "selectedDates", 2);
k([
  s({ type: String })
], f.prototype, "role", 2);
k([
  s({ type: String, reflect: !0 })
], f.prototype, "size", 2);
k([
  s({ type: String })
], f.prototype, "minDate", 2);
k([
  s({ type: String })
], f.prototype, "maxDate", 2);
k([
  s({ type: Boolean })
], f.prototype, "showNeighboringMonth", 2);
k([
  s({ attribute: !1 })
], f.prototype, "tileClassName", 2);
f = k([
  T("glatam-calendar-month-view")
], f);
var F = Object.defineProperty, H = Object.getOwnPropertyDescriptor, R = (e, t, a, i) => {
  for (var r = i > 1 ? void 0 : i ? H(t, a) : t, l = e.length - 1, o; l >= 0; l--)
    (o = e[l]) && (r = (i ? o(t, a, r) : o(r)) || r);
  return i && r && F(t, a, r), r;
};
let w = class extends O {
  constructor() {
    super(...arguments), this.days = [], this.slots = [], this.locale = "es", this.selectedRange = null, this.role = "provider", this.isDragging = !1, this.dragDayIndex = null, this.dragStartSlotIndex = null, this.dragEndSlotIndex = null, this.handleMouseUp = () => {
      if (!this.isDragging || this.dragDayIndex === null || this.dragStartSlotIndex === null || this.dragEndSlotIndex === null) {
        this.isDragging = !1;
        return;
      }
      this.isDragging = !1;
      const e = Math.min(this.dragStartSlotIndex, this.dragEndSlotIndex), t = Math.max(this.dragStartSlotIndex, this.dragEndSlotIndex), a = this.days[this.dragDayIndex], i = a.slots.slice(e, t + 1);
      i.some((r) => r.isBlocked) || this.dispatchEvent(new CustomEvent("range-select", {
        detail: { dateString: a.dateString, start: i[0].start, end: i[i.length - 1].end },
        bubbles: !0,
        composed: !0
      })), this.dragDayIndex = null, this.dragStartSlotIndex = null, this.dragEndSlotIndex = null;
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("mouseup", this.handleMouseUp);
  }
  disconnectedCallback() {
    window.removeEventListener("mouseup", this.handleMouseUp), super.disconnectedCallback();
  }
  handleMouseDown(e, t, a) {
    if (a) {
      if (this.role === "buyer") return;
      this.dispatchEvent(new CustomEvent("slot-click", {
        detail: { dateString: this.days[e].dateString, slot: this.days[e].slots[t], isBlocked: !0 },
        bubbles: !0,
        composed: !0
      }));
      return;
    }
    this.isDragging = !0, this.dragDayIndex = e, this.dragStartSlotIndex = t, this.dragEndSlotIndex = t;
  }
  handleMouseEnter(e, t, a) {
    this.isDragging && e === this.dragDayIndex && !a && (this.dragEndSlotIndex = t);
  }
  isSlotSelected(e, t) {
    return !this.selectedRange || this.selectedRange.dateString !== e ? !1 : t.start >= this.selectedRange.start && t.end <= this.selectedRange.end;
  }
  isSlotDragSelecting(e, t) {
    if (!this.isDragging || e !== this.dragDayIndex) return !1;
    const a = Math.min(this.dragStartSlotIndex, this.dragEndSlotIndex), i = Math.max(this.dragStartSlotIndex, this.dragEndSlotIndex);
    return t >= a && t <= i;
  }
  render() {
    const e = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    return d`
      <div class="time-col">
        <div class="header-cell">Hora</div>
        ${this.slots.map((t) => d`<div class="slot-cell time-slot-label">${t.start}</div>`)}
      </div>

      ${this.days.map((t, a) => {
      const i = t.dateString === e, r = new Intl.DateTimeFormat(this.locale, { weekday: "short" }).format(t.date);
      return d`
          <div class="day-col">
            <div class="header-cell ${i ? "today" : ""}">
              <div>${r}</div>
              <div class="day-num">${t.dayNumber}</div>
            </div>
            
            ${t.slots.map((l, o) => {
        var u, v;
        const c = l.isBlocked, n = this.isSlotSelected(t.dateString, l), g = this.isSlotDragSelecting(a, o);
        return d`
                <div
                  class=${I({
          "slot-cell": !0,
          available: !c,
          blocked: c,
          selected: n,
          "drag-selecting": g
        })}
                  @mousedown=${() => this.handleMouseDown(a, o, c)}
                  @mouseenter=${() => this.handleMouseEnter(a, o, c)}
                  title=${c && ((u = l.rule) != null && u.description) ? l.rule.description : ""}
                >
                  ${c ? ((v = l.rule) == null ? void 0 : v.description) || "Ocupado" : n ? "Reservado" : ""}
                </div>
              `;
      })}
          </div>
        `;
    })}
    `;
  }
};
w.styles = E`
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
R([
  s({ type: Array })
], w.prototype, "days", 2);
R([
  s({ type: Array })
], w.prototype, "slots", 2);
R([
  s({ type: String })
], w.prototype, "locale", 2);
R([
  s({ type: Object })
], w.prototype, "selectedRange", 2);
R([
  s({ type: String })
], w.prototype, "role", 2);
R([
  m()
], w.prototype, "isDragging", 2);
R([
  m()
], w.prototype, "dragDayIndex", 2);
R([
  m()
], w.prototype, "dragStartSlotIndex", 2);
R([
  m()
], w.prototype, "dragEndSlotIndex", 2);
w = R([
  T("glatam-calendar-week-view")
], w);
var q = Object.defineProperty, G = Object.getOwnPropertyDescriptor, z = (e, t, a, i) => {
  for (var r = i > 1 ? void 0 : i ? G(t, a) : t, l = e.length - 1, o; l >= 0; l--)
    (o = e[l]) && (r = (i ? o(t, a, r) : o(r)) || r);
  return i && r && q(t, a, r), r;
};
let D = class extends O {
  constructor() {
    super(...arguments), this.day = null, this.slots = [], this.locale = "es", this.selectedRange = null, this.role = "provider", this.isDragging = !1, this.dragStartSlotIndex = null, this.dragEndSlotIndex = null, this.handleMouseUp = () => {
      if (!this.isDragging || !this.day || this.dragStartSlotIndex === null || this.dragEndSlotIndex === null) {
        this.isDragging = !1;
        return;
      }
      this.isDragging = !1;
      const e = Math.min(this.dragStartSlotIndex, this.dragEndSlotIndex), t = Math.max(this.dragStartSlotIndex, this.dragEndSlotIndex), a = this.day.slots.slice(e, t + 1);
      a.some((i) => i.isBlocked) || this.dispatchEvent(new CustomEvent("range-select", {
        detail: { dateString: this.day.dateString, start: a[0].start, end: a[a.length - 1].end },
        bubbles: !0,
        composed: !0
      })), this.dragStartSlotIndex = null, this.dragEndSlotIndex = null;
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("mouseup", this.handleMouseUp);
  }
  disconnectedCallback() {
    window.removeEventListener("mouseup", this.handleMouseUp), super.disconnectedCallback();
  }
  handleMouseDown(e, t) {
    if (t && this.day) {
      if (this.role === "buyer") return;
      this.dispatchEvent(new CustomEvent("slot-click", {
        detail: { dateString: this.day.dateString, slot: this.day.slots[e], isBlocked: !0 },
        bubbles: !0,
        composed: !0
      }));
      return;
    }
    this.isDragging = !0, this.dragStartSlotIndex = e, this.dragEndSlotIndex = e;
  }
  handleMouseEnter(e, t) {
    this.isDragging && !t && (this.dragEndSlotIndex = e);
  }
  isSlotSelected(e) {
    return !this.day || !this.selectedRange || this.selectedRange.dateString !== this.day.dateString ? !1 : e.start >= this.selectedRange.start && e.end <= this.selectedRange.end;
  }
  isSlotDragSelecting(e) {
    if (!this.isDragging) return !1;
    const t = Math.min(this.dragStartSlotIndex, this.dragEndSlotIndex), a = Math.max(this.dragStartSlotIndex, this.dragEndSlotIndex);
    return e >= t && e <= a;
  }
  render() {
    if (!this.day) return d`<div>Cargando...</div>`;
    const e = this.day.dateString === (/* @__PURE__ */ new Date()).toISOString().split("T")[0], t = new Intl.DateTimeFormat(this.locale, { weekday: "long", day: "numeric", month: "long" }).format(this.day.date);
    return d`
      <div class="time-col">
        <div class="header-cell">Hora</div>
        ${this.slots.map((a) => d`<div class="slot-cell time-slot-label">${a.start}</div>`)}
      </div>

      <div class="day-col">
        <div class="header-cell ${e ? "today" : ""}">
          <div style="text-transform: capitalize;">${t}</div>
        </div>

        ${this.day.slots.map((a, i) => {
      var c, n;
      const r = a.isBlocked, l = this.isSlotSelected(a), o = this.isSlotDragSelecting(i);
      return d`
            <div
              class=${I({
        "slot-cell": !0,
        available: !r,
        blocked: r,
        selected: l,
        "drag-selecting": o
      })}
              @mousedown=${() => this.handleMouseDown(i, r)}
              @mouseenter=${() => this.handleMouseEnter(i, r)}
              title=${r && ((c = a.rule) != null && c.description) ? a.rule.description : ""}
            >
              ${r ? ((n = a.rule) == null ? void 0 : n.description) || "Ocupado" : l ? "Reservado" : ""}
            </div>
          `;
    })}
      </div>
    `;
  }
};
D.styles = E`
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
z([
  s({ type: Object })
], D.prototype, "day", 2);
z([
  s({ type: Array })
], D.prototype, "slots", 2);
z([
  s({ type: String })
], D.prototype, "locale", 2);
z([
  s({ type: Object })
], D.prototype, "selectedRange", 2);
z([
  s({ type: String })
], D.prototype, "role", 2);
z([
  m()
], D.prototype, "isDragging", 2);
z([
  m()
], D.prototype, "dragStartSlotIndex", 2);
z([
  m()
], D.prototype, "dragEndSlotIndex", 2);
D = z([
  T("glatam-calendar-day-view")
], D);
var V = Object.defineProperty, Y = Object.getOwnPropertyDescriptor, $ = (e, t, a, i) => {
  for (var r = i > 1 ? void 0 : i ? Y(t, a) : t, l = e.length - 1, o; l >= 0; l--)
    (o = e[l]) && (r = (i ? o(t, a, r) : o(r)) || r);
  return i && r && V(t, a, r), r;
};
let x = class extends O {
  constructor() {
    super(...arguments), this.open = !1, this.dateString = "", this.startTime = "", this.endTime = "", this.isRange = !1, this.existingRule = null, this.description = "", this.blockAllDay = !0, this.isRecurring = !1, this.selectedDays = [];
  }
  willUpdate(e) {
    e.has("open") && this.open && (this.existingRule ? (this.description = "Bloqueo", this.blockAllDay = !this.existingRule.slots || this.existingRule.slots.length === 0, this.isRecurring = this.existingRule.type === "weekly", this.selectedDays = this.existingRule.daysOfWeek || []) : (this.description = "", this.blockAllDay = !this.isRange, this.isRecurring = !1, this.selectedDays = [(/* @__PURE__ */ new Date(this.dateString + "T00:00:00")).getDay()]));
  }
  toggleDay(e) {
    this.selectedDays.indexOf(e) > -1 ? this.selectedDays = this.selectedDays.filter((a) => a !== e) : this.selectedDays = [...this.selectedDays, e];
  }
  handleSave() {
    const e = {
      title: this.description || "Bloqueo",
      blockAllDay: this.blockAllDay,
      isRecurring: this.isRecurring,
      selectedDays: this.selectedDays,
      dateString: this.dateString,
      startTime: this.startTime,
      endTime: this.endTime
    };
    this.dispatchEvent(new CustomEvent("save-rule", { detail: e, bubbles: !0, composed: !0 }));
  }
  handleDelete() {
    this.existingRule && this.dispatchEvent(new CustomEvent("delete-rule", {
      detail: { id: this.existingRule.id },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    const e = ["D", "L", "M", "M", "J", "V", "S"], t = this.isRange ? `${this.dateString} (${this.startTime} - ${this.endTime})` : this.dateString;
    return d`
      <div class=${I({ "modal-overlay": !0, open: this.open })}>
        <div class="modal-content">
          <h3>${this.existingRule ? "Gestionar Bloqueo" : "Crear Bloqueo"}</h3>
          
          <div style="font-size: 0.85rem; color: var(--glatam-text-secondary);">
            Selección: <strong>${t}</strong>
          </div>

          <div class="form-group">
            <label>Descripción / Nota</label>
            <input 
              type="text" 
              .value=${this.description} 
              @input=${(a) => this.description = a.target.value}
              placeholder="Ej. Reunión de equipo, Vacaciones" 
            />
          </div>

          <div class="switch-row">
            <label>Bloquear todo el día</label>
            <label class="switch">
              <input 
                type="checkbox" 
                .checked=${this.blockAllDay} 
                @change=${(a) => this.blockAllDay = a.target.checked}
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
                @change=${(a) => this.isRecurring = a.target.checked}
              />
              <span class="slider"></span>
            </label>
          </div>

          ${this.isRecurring ? d`
                <div class="form-group">
                  <label>Repetir los días</label>
                  <div class="days-grid">
                    ${[1, 2, 3, 4, 5, 6, 0].map((a) => d`
                      <button 
                        class="day-btn ${this.selectedDays.includes(a) ? "selected" : ""}"
                        @click=${() => this.toggleDay(a)}
                      >
                        ${e[a]}
                      </button>
                    `)}
                  </div>
                </div>
              ` : ""}

          <div class="btn-actions">
            ${this.existingRule ? d`<button class="btn btn-danger" @click=${this.handleDelete}>Eliminar</button>` : ""}
            <button class="btn btn-cancel" @click=${() => this.dispatchEvent(new CustomEvent("close"))}>Cancelar</button>
            <button class="btn btn-save" @click=${this.handleSave}>Guardar</button>
          </div>
        </div>
      </div>
    `;
  }
};
x.styles = E`
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
$([
  s({ type: Boolean })
], x.prototype, "open", 2);
$([
  s({ type: String })
], x.prototype, "dateString", 2);
$([
  s({ type: String })
], x.prototype, "startTime", 2);
$([
  s({ type: String })
], x.prototype, "endTime", 2);
$([
  s({ type: Boolean })
], x.prototype, "isRange", 2);
$([
  s({ type: Object })
], x.prototype, "existingRule", 2);
$([
  m()
], x.prototype, "description", 2);
$([
  m()
], x.prototype, "blockAllDay", 2);
$([
  m()
], x.prototype, "isRecurring", 2);
$([
  m()
], x.prototype, "selectedDays", 2);
x = $([
  T("glatam-calendar-modal")
], x);
var Z = Object.defineProperty, J = Object.getOwnPropertyDescriptor, h = (e, t, a, i) => {
  for (var r = i > 1 ? void 0 : i ? J(t, a) : t, l = e.length - 1, o; l >= 0; l--)
    (o = e[l]) && (r = (i ? o(t, a, r) : o(r)) || r);
  return i && r && Z(t, a, r), r;
};
const X = [
  { start: "09:00", end: "10:00" },
  { start: "10:00", end: "11:00" },
  { start: "11:00", end: "12:00" },
  { start: "12:00", end: "13:00" },
  { start: "13:00", end: "14:00" },
  { start: "14:00", end: "15:00" },
  { start: "15:00", end: "16:00" },
  { start: "16:00", end: "17:00" },
  { start: "17:00", end: "18:00" }
];
let p = class extends O {
  constructor() {
    super(...arguments), this.role = "provider", this.size = "medium", this.view = "month", this.locale = "es", this.startOfWeekDay = 0, this.rules = [], this.selectedDates = [], this.selectedRange = null, this.hostTimezone = "America/Bogota", this.activeTimezone = "local", this.slots = X, this.minDate = "", this.maxDate = "", this.showNeighboringMonth = !0, this.tileClassName = null, this.activeDate = /* @__PURE__ */ new Date(), this.localRules = [], this.darkMode = !1, this.modalOpen = !1, this.modalDateString = "", this.modalStartTime = "", this.modalEndTime = "", this.modalIsRange = !1, this.modalExistingRule = null;
  }
  firstUpdated() {
    this.darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches, this.localRules = [...this.rules];
  }
  willUpdate(e) {
    e.has("rules") && this.rules.length > 0 && this.localRules.length === 0 && (this.localRules = [...this.rules]);
  }
  updated(e) {
    e.has("darkMode") && this.classList.toggle("dark-mode", this.darkMode);
  }
  handlePrev() {
    const e = new Date(this.activeDate);
    this.view === "month" ? e.setMonth(e.getMonth() - 1) : this.view === "week" ? e.setDate(e.getDate() - 7) : e.setDate(e.getDate() - 1), this.activeDate = e;
  }
  handleNext() {
    const e = new Date(this.activeDate);
    this.view === "month" ? e.setMonth(e.getMonth() + 1) : this.view === "week" ? e.setDate(e.getDate() + 7) : e.setDate(e.getDate() + 1), this.activeDate = e;
  }
  getHeaderTitle() {
    const e = this.view === "month" ? { month: "long", year: "numeric" } : this.view === "week" ? { month: "short", year: "numeric" } : { day: "numeric", month: "long", year: "numeric" };
    return new Intl.DateTimeFormat(this.locale, e).format(this.activeDate);
  }
  handleDaySelect(e) {
    const { dateString: t, isBlocked: a } = e.detail;
    this.role === "buyer" && a || (this.activeDate = /* @__PURE__ */ new Date(t + "T00:00:00"), this.view = "day", this.dispatchEvent(new CustomEvent("date-selected", { detail: { dateString: t }, bubbles: !0, composed: !0 })));
  }
  handleRangeSelect(e) {
    var u, v;
    const { dateString: t, start: a, end: i } = e.detail, r = this.activeTimezone === "local" ? C(this.activeDate, this.hostTimezone, "local") : 0, l = this.getDisplaySlots(r), o = l.findIndex((S) => S.start === a), c = l.findIndex((S) => S.end === i), n = ((u = this.slots[o]) == null ? void 0 : u.start) || a, g = ((v = this.slots[c]) == null ? void 0 : v.end) || i;
    if (this.role === "buyer") {
      this.selectedRange = { dateString: t, start: a, end: i }, this.dispatchEvent(new CustomEvent("booking-selected", { detail: { dateString: t, start: a, end: i, hostStart: n, hostEnd: g }, bubbles: !0, composed: !0 }));
      return;
    }
    this.openModal(t, n, g, !0, null);
  }
  handleSlotClick(e) {
    const { dateString: t, slot: a } = e.detail, i = /* @__PURE__ */ new Date(t + "T00:00:00"), r = this.activeTimezone === "local" ? C(this.activeDate, this.hostTimezone, "local") : 0, l = this.getDisplaySlots(r), o = l.findIndex((g) => g.start === a.start), c = this.slots[o] || a;
    if (this.role === "buyer") {
      this.selectedRange = { dateString: t, start: a.start, end: a.end }, this.dispatchEvent(new CustomEvent("booking-selected", { detail: { dateString: t, start: a.start, end: a.end, hostStart: c.start, hostEnd: c.end }, bubbles: !0, composed: !0 }));
      return;
    }
    const n = this.localRules.find((g) => M(i, c, [g]));
    this.openModal(t, c.start, c.end, !0, n || null);
  }
  handleBlockDayAction() {
    const e = N(this.activeDate), t = this.localRules.find((a) => M(this.activeDate, void 0, [a]));
    this.openModal(e, "", "", !1, t || null);
  }
  openModal(e, t, a, i, r) {
    this.modalDateString = e, this.modalStartTime = t, this.modalEndTime = a, this.modalIsRange = i, this.modalExistingRule = r, this.modalOpen = !0;
  }
  handleSaveRule(e) {
    const t = e.detail, a = this.modalExistingRule ? this.modalExistingRule.id : `rule-${Date.now()}`, i = {
      id: a,
      type: t.isRecurring ? "weekly" : "date-range",
      slots: t.blockAllDay ? void 0 : [{ start: t.startTime, end: t.endTime }],
      daysOfWeek: t.isRecurring ? t.selectedDays : void 0,
      startDate: t.isRecurring ? void 0 : t.dateString,
      endDate: t.isRecurring ? void 0 : t.dateString,
      description: t.title
    };
    this.localRules = this.modalExistingRule ? this.localRules.map((r) => r.id === a ? i : r) : [...this.localRules, i], this.modalOpen = !1, this.dispatchEvent(new CustomEvent("rules-changed", { detail: { rules: this.localRules }, bubbles: !0, composed: !0 }));
  }
  handleDeleteRule(e) {
    this.localRules = this.localRules.filter((t) => t.id !== e.detail.id), this.modalOpen = !1, this.dispatchEvent(new CustomEvent("rules-changed", { detail: { rules: this.localRules }, bubbles: !0, composed: !0 }));
  }
  getDisplaySlots(e) {
    return e === 0 ? this.slots : this.slots.map((t) => {
      const a = W(t, e), i = a.dayShift > 0 ? " (+1d)" : a.dayShift < 0 ? " (-1d)" : "";
      return { start: a.start + i, end: a.end + i };
    });
  }
  render() {
    var c;
    const e = this.activeDate.getFullYear(), t = this.activeDate.getMonth(), a = M(this.activeDate, void 0, this.localRules), i = this.activeTimezone === "local" ? C(this.activeDate, this.hostTimezone, "local") : 0, r = this.getDisplaySlots(i), l = (n) => n.map((g) => ({ ...g, slots: g.slots.map((u, v) => {
      var S, B;
      return { ...u, start: ((S = r[v]) == null ? void 0 : S.start) || u.start, end: ((B = r[v]) == null ? void 0 : B.end) || u.end };
    }) })), o = ((c = this.hostTimezone.split("/").pop()) == null ? void 0 : c.replace("_", " ")) || "Anfitrión";
    return d`
      <div class="calendar-header">
        <div class="nav-group">
          <button class="btn" @click=${() => this.activeDate = /* @__PURE__ */ new Date()}>Hoy</button>
          <button class="btn" @click=${this.handlePrev}>&lt;</button>
          <button class="btn" @click=${this.handleNext}>&gt;</button>
          <span class="nav-title" style="text-transform: capitalize;">${this.getHeaderTitle()}</span>
        </div>
        
        <div class="view-group">
          ${this.role === "provider" ? d`
            <div class="timezone-badge">
              🌐 Zona:
              <select class="timezone-select" @change=${(n) => this.activeTimezone = n.target.value}>
                <option value="local" ?selected=${this.activeTimezone === "local"}>Mi Hora</option>
                <option value="host" ?selected=${this.activeTimezone === "host"}>Hora ${o}</option>
              </select>
            </div>
          ` : ""}
          ${this.role === "provider" && this.view === "day" ? d`<button class="btn btn-primary" @click=${this.handleBlockDayAction} style="margin-right: 8px;">${a ? "Liberar Día" : "Bloquear Día"}</button>` : ""}
          <button class="btn" @click=${() => this.darkMode = !this.darkMode} style="margin-right: 8px;">${this.darkMode ? "☀️" : "🌙"}</button>
          <div class="btn-group">
            <button class="btn ${this.view === "month" ? "active" : ""}" @click=${() => this.view = "month"}>Mes</button>
            <button class="btn ${this.view === "week" ? "active" : ""}" @click=${() => this.view = "week"}>Semana</button>
            <button class="btn ${this.view === "day" ? "active" : ""}" @click=${() => this.view = "day"}>Día</button>
          </div>
        </div>
      </div>

      <div class="calendar-body">
        ${this.view === "month" ? d`<glatam-calendar-month-view .days=${j(e, t, this.localRules, this.slots, this.startOfWeekDay)} .locale=${this.locale} .startOfWeekDay=${this.startOfWeekDay} .role=${this.role} .size=${this.size} .minDate=${this.minDate} .maxDate=${this.maxDate} .showNeighboringMonth=${this.showNeighboringMonth} .tileClassName=${this.tileClassName} @day-select=${this.handleDaySelect}></glatam-calendar-month-view>` : this.view === "week" ? d`<glatam-calendar-week-view .days=${l(_(this.activeDate, this.localRules, this.slots, this.startOfWeekDay))} .slots=${r} .locale=${this.locale} .selectedRange=${this.selectedRange} .role=${this.role} @range-select=${this.handleRangeSelect} @slot-click=${this.handleSlotClick}></glatam-calendar-week-view>` : d`<glatam-calendar-day-view .day=${l(_(this.activeDate, this.localRules, this.slots, this.startOfWeekDay)).find((n) => n.dateString === N(this.activeDate)) || null} .slots=${r} .locale=${this.locale} .selectedRange=${this.selectedRange} .role=${this.role} @range-select=${this.handleRangeSelect} @slot-click=${this.handleSlotClick}></glatam-calendar-day-view>`}
      </div>

      <glatam-calendar-modal
        .open=${this.modalOpen} .dateString=${this.modalDateString} .startTime=${this.modalStartTime} .endTime=${this.modalEndTime}
        .isRange=${this.modalIsRange} .existingRule=${this.modalExistingRule} @save-rule=${this.handleSaveRule}
        @delete-rule=${this.handleDeleteRule} @close=${() => this.modalOpen = !1}
      ></glatam-calendar-modal>
    `;
  }
};
p.styles = [A, P];
h([
  s({ type: String })
], p.prototype, "role", 2);
h([
  s({ type: String, reflect: !0 })
], p.prototype, "size", 2);
h([
  s({ type: String })
], p.prototype, "view", 2);
h([
  s({ type: String })
], p.prototype, "locale", 2);
h([
  s({ type: Number })
], p.prototype, "startOfWeekDay", 2);
h([
  s({ type: Array })
], p.prototype, "rules", 2);
h([
  s({ type: Array })
], p.prototype, "selectedDates", 2);
h([
  s({ type: Object })
], p.prototype, "selectedRange", 2);
h([
  s({ type: String })
], p.prototype, "hostTimezone", 2);
h([
  s({ type: String })
], p.prototype, "activeTimezone", 2);
h([
  s({ type: Array })
], p.prototype, "slots", 2);
h([
  s({ type: String })
], p.prototype, "minDate", 2);
h([
  s({ type: String })
], p.prototype, "maxDate", 2);
h([
  s({ type: Boolean })
], p.prototype, "showNeighboringMonth", 2);
h([
  s({ attribute: !1 })
], p.prototype, "tileClassName", 2);
h([
  m()
], p.prototype, "activeDate", 2);
h([
  m()
], p.prototype, "localRules", 2);
h([
  m()
], p.prototype, "darkMode", 2);
h([
  m()
], p.prototype, "modalOpen", 2);
h([
  m()
], p.prototype, "modalDateString", 2);
h([
  m()
], p.prototype, "modalStartTime", 2);
h([
  m()
], p.prototype, "modalEndTime", 2);
h([
  m()
], p.prototype, "modalIsRange", 2);
h([
  m()
], p.prototype, "modalExistingRule", 2);
p = h([
  T("glatam-calendar")
], p);
var K = Object.defineProperty, Q = Object.getOwnPropertyDescriptor, y = (e, t, a, i) => {
  for (var r = i > 1 ? void 0 : i ? Q(t, a) : t, l = e.length - 1, o; l >= 0; l--)
    (o = e[l]) && (r = (i ? o(t, a, r) : o(r)) || r);
  return i && r && K(t, a, r), r;
};
let b = class extends O {
  constructor() {
    super(...arguments), this.role = "buyer", this.locale = "es", this.startOfWeekDay = 0, this.rules = [], this.selectedRange = null, this.size = "medium", this.hostTimezone = "America/Bogota", this.activeTimezone = "local", this.minDate = "", this.maxDate = "", this.showNeighboringMonth = !0, this.tileClassName = null, this.slots = [
      { start: "09:00", end: "10:00" },
      { start: "10:00", end: "11:00" },
      { start: "11:00", end: "12:00" },
      { start: "12:00", end: "13:00" },
      { start: "13:00", end: "14:00" },
      { start: "14:00", end: "15:00" },
      { start: "15:00", end: "16:00" },
      { start: "16:00", end: "17:00" },
      { start: "17:00", end: "18:00" }
    ], this.activeDate = /* @__PURE__ */ new Date(), this.dropdownOpen = !1, this.dropdownSelectedDateString = "";
  }
  handleDropdownDaySelect(e) {
    this.dropdownSelectedDateString = e.detail.dateString;
  }
  selectDropdownSlot(e) {
    const t = {
      dateString: this.dropdownSelectedDateString,
      start: e.displayStart,
      end: e.displayEnd,
      hostStart: e.start,
      hostEnd: e.end
    };
    this.selectedRange = { dateString: this.dropdownSelectedDateString, start: e.displayStart, end: e.displayEnd }, this.dispatchEvent(new CustomEvent("booking-selected", { detail: t, bubbles: !0, composed: !0 })), this.dropdownOpen = !1, this.dropdownSelectedDateString = "";
  }
  render() {
    const e = this.selectedRange ? `Reserva: ${this.selectedRange.dateString} (${this.selectedRange.start} - ${this.selectedRange.end})` : "Seleccionar Fecha y Hora", t = this.activeDate.getFullYear(), a = this.activeDate.getMonth(), i = this.dropdownSelectedDateString ? /* @__PURE__ */ new Date(this.dropdownSelectedDateString + "T00:00:00") : null, r = i && this.activeTimezone === "local" ? C(i, this.hostTimezone, "local") : 0, l = i ? this.slots.map((o) => {
      const c = M(i, o, this.rules), n = W(o, r), g = n.dayShift > 0 ? " (+1d)" : n.dayShift < 0 ? " (-1d)" : "";
      return {
        ...o,
        displayStart: n.start + g,
        displayEnd: n.end + g,
        isBlocked: c
      };
    }) : [];
    return d`
      <div class="dropdown-container">
        <button class="btn btn-primary dropdown-toggle" @click=${() => this.dropdownOpen = !this.dropdownOpen}>
          <span>${e}</span> <span>${this.dropdownOpen ? "▲" : "▼"}</span>
        </button>

        ${this.dropdownOpen ? d`
              <div class="dropdown-card" style="--glatam-day-min-height: 38px;">
                ${this.dropdownSelectedDateString ? d`
                      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid var(--glatam-border); padding-bottom:8px;">
                        <button class="btn" style="height:28px; padding:0 8px; font-size:0.75rem;" @click=${() => this.dropdownSelectedDateString = ""}>&lt; Volver</button>
                        <span style="font-size:0.8rem; font-weight:600; color: var(--glatam-text);">${this.dropdownSelectedDateString}</span>
                      </div>
                      <div class="slot-list">
                        ${l.map((o) => d`
                          <button
                            class="slot-btn ${o.isBlocked ? "blocked" : ""}"
                            ?disabled=${o.isBlocked}
                            @click=${() => this.selectDropdownSlot(o)}
                          >
                            ${o.displayStart} - ${o.displayEnd} ${o.isBlocked ? "(Ocupado)" : ""}
                          </button>
                        `)}
                      </div>
                    ` : d`
                      <div style="font-weight:600; font-size:0.9rem; text-align:center; color: var(--glatam-text);">Selecciona un Día</div>
                      <glatam-calendar-month-view
                        .days=${j(t, a, this.rules, this.slots, this.startOfWeekDay)}
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
                    `}
              </div>
            ` : ""}
      </div>
    `;
  }
};
b.styles = [
  A,
  P,
  E`
      :host {
        display: inline-block;
        background: transparent;
        border: none;
        padding: 0;
        box-shadow: none;
        width: 100%;
      }
    `
];
y([
  s({ type: String })
], b.prototype, "role", 2);
y([
  s({ type: String })
], b.prototype, "locale", 2);
y([
  s({ type: Number })
], b.prototype, "startOfWeekDay", 2);
y([
  s({ type: Array })
], b.prototype, "rules", 2);
y([
  s({ type: Object })
], b.prototype, "selectedRange", 2);
y([
  s({ type: String, reflect: !0 })
], b.prototype, "size", 2);
y([
  s({ type: String })
], b.prototype, "hostTimezone", 2);
y([
  s({ type: String })
], b.prototype, "activeTimezone", 2);
y([
  s({ type: String })
], b.prototype, "minDate", 2);
y([
  s({ type: String })
], b.prototype, "maxDate", 2);
y([
  s({ type: Boolean })
], b.prototype, "showNeighboringMonth", 2);
y([
  s({ attribute: !1 })
], b.prototype, "tileClassName", 2);
y([
  s({ type: Array })
], b.prototype, "slots", 2);
y([
  m()
], b.prototype, "activeDate", 2);
y([
  m()
], b.prototype, "dropdownOpen", 2);
y([
  m()
], b.prototype, "dropdownSelectedDateString", 2);
b = y([
  T("glatam-calendar-mini")
], b);
export {
  p as GlatamCalendar,
  D as GlatamCalendarDayView,
  b as GlatamCalendarMini,
  x as GlatamCalendarModal,
  f as GlatamCalendarMonthView,
  w as GlatamCalendarWeekView,
  P as calendarStyles,
  st as formatISODate,
  lt as isTimeBlocked,
  nt as parseISODate,
  A as variablesStyles
};
