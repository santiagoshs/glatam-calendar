"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const s=require("lit"),l=require("lit/decorators.js"),y=require("@glatam/calendar-core"),k=require("lit/directives/class-map.js"),C=s.css`
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
`,$=s.css`
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
`;function D(d,t,e){if(t===e)return 0;const a=(r,i)=>{const o={year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric",hour12:!1};i!=="local"&&(o.timeZone=i);const c=new Intl.DateTimeFormat("en-US",o).formatToParts(r),n=new Map(c.map(b=>[b.type,b.value])),g=Number(n.get("hour")),h=g===24?0:g;return new Date(Number(n.get("year")),Number(n.get("month"))-1,Number(n.get("day")),h,Number(n.get("minute")),Number(n.get("second")))};try{const r=a(d,t);return(a(d,e).getTime()-r.getTime())/(60*1e3)}catch{return 0}}function G(d,t){if(t===0)return{start:d.start,end:d.end,dayShift:0};const e=n=>{const[g,h]=n.split(":").map(Number);return g*60+h},a=n=>{let g=n%1440;g<0&&(g+=1440);const h=String(Math.floor(g/60)).padStart(2,"0"),b=String(g%60).padStart(2,"0");return`${h}:${b}`},r=e(d.start),i=e(d.end),o=r+t,p=i+t;let c=0;return o<0?c=-1:o>=1440&&(c=1),{start:a(o),end:a(p),dayShift:c}}var R=Object.defineProperty,E=Object.getOwnPropertyDescriptor,v=(d,t,e,a)=>{for(var r=a>1?void 0:a?E(t,e):t,i=d.length-1,o;i>=0;i--)(o=d[i])&&(r=(a?o(t,e,r):o(r))||r);return a&&r&&R(t,e,r),r};exports.GlatamCalendarMonthView=class extends s.LitElement{constructor(){super(...arguments),this.days=[],this.locale="es",this.startOfWeekDay=0,this.selectedDates=[],this.role="provider",this.size="medium",this.minDate="",this.maxDate="",this.showNeighboringMonth=!0,this.tileClassName=null}getWeekdayNames(){const t=[],e=new Date(2026,6,12+this.startOfWeekDay),a=new Intl.DateTimeFormat(this.locale,{weekday:"short"});for(let r=0;r<7;r++)t.push(a.format(e)),e.setDate(e.getDate()+1);return t}handleDayClick(t){this.role==="buyer"&&t.isBlocked||this.dispatchEvent(new CustomEvent("day-select",{detail:{dateString:t.dateString,isBlocked:t.isBlocked},bubbles:!0,composed:!0}))}render(){const t=this.getWeekdayNames();return s.html`
      ${t.map(e=>s.html`<div class="weekday">${e}</div>`)}
      
      ${this.days.map(e=>{var c;if(!e.isCurrentMonth&&!this.showNeighboringMonth)return s.html`<div class="day-cell empty"></div>`;const a=e.dateString===new Date().toISOString().split("T")[0],r=this.selectedDates.includes(e.dateString),i=e.slots.filter(n=>n.isBlocked),o=this.minDate&&e.dateString<this.minDate||this.maxDate&&e.dateString>this.maxDate,p=this.tileClassName?this.tileClassName({date:e.date,dateString:e.dateString}):"";return s.html`
          <div 
            class=${k.classMap({"day-cell":!0,padding:!e.isCurrentMonth,blocked:e.isBlocked,today:a,selected:r,disabled:!!o,[p]:!!p})}
            part="day-cell ${p}"
            @click=${()=>this.handleDayClick(e)}
          >
            <div class="day-number">${e.dayNumber}</div>
            
            <div class="slot-indicator">
              ${e.isBlocked?s.html`<div class="badge blocked-day">${((c=e.rule)==null?void 0:c.description)||"Bloqueado"}</div>`:i.slice(0,2).map(n=>{var g,h;return s.html`
                    <div class="badge blocked-slot" title=${((g=n.rule)==null?void 0:g.description)||""}>
                      🚫 ${((h=n.rule)==null?void 0:h.description)||n.start}
                    </div>
                  `})}
              ${!e.isBlocked&&i.length>2?s.html`<div style="text-align: center; font-size: 0.65rem; color: var(--glatam-text-secondary);">+${i.length-2} tareas</div>`:""}
            </div>
          </div>
        `})}
    `}};exports.GlatamCalendarMonthView.styles=s.css`
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
  `;v([l.property({type:Array})],exports.GlatamCalendarMonthView.prototype,"days",2);v([l.property({type:String})],exports.GlatamCalendarMonthView.prototype,"locale",2);v([l.property({type:Number})],exports.GlatamCalendarMonthView.prototype,"startOfWeekDay",2);v([l.property({type:Array})],exports.GlatamCalendarMonthView.prototype,"selectedDates",2);v([l.property({type:String})],exports.GlatamCalendarMonthView.prototype,"role",2);v([l.property({type:String,reflect:!0})],exports.GlatamCalendarMonthView.prototype,"size",2);v([l.property({type:String})],exports.GlatamCalendarMonthView.prototype,"minDate",2);v([l.property({type:String})],exports.GlatamCalendarMonthView.prototype,"maxDate",2);v([l.property({type:Boolean})],exports.GlatamCalendarMonthView.prototype,"showNeighboringMonth",2);v([l.property({attribute:!1})],exports.GlatamCalendarMonthView.prototype,"tileClassName",2);exports.GlatamCalendarMonthView=v([l.customElement("glatam-calendar-month-view")],exports.GlatamCalendarMonthView);var z=Object.defineProperty,O=Object.getOwnPropertyDescriptor,x=(d,t,e,a)=>{for(var r=a>1?void 0:a?O(t,e):t,i=d.length-1,o;i>=0;i--)(o=d[i])&&(r=(a?o(t,e,r):o(r))||r);return a&&r&&z(t,e,r),r};exports.GlatamCalendarWeekView=class extends s.LitElement{constructor(){super(...arguments),this.days=[],this.slots=[],this.locale="es",this.selectedRange=null,this.role="provider",this.isDragging=!1,this.dragDayIndex=null,this.dragStartSlotIndex=null,this.dragEndSlotIndex=null,this.handleMouseUp=()=>{if(!this.isDragging||this.dragDayIndex===null||this.dragStartSlotIndex===null||this.dragEndSlotIndex===null){this.isDragging=!1;return}this.isDragging=!1;const t=Math.min(this.dragStartSlotIndex,this.dragEndSlotIndex),e=Math.max(this.dragStartSlotIndex,this.dragEndSlotIndex),a=this.days[this.dragDayIndex],r=a.slots.slice(t,e+1);r.some(i=>i.isBlocked)||this.dispatchEvent(new CustomEvent("range-select",{detail:{dateString:a.dateString,start:r[0].start,end:r[r.length-1].end},bubbles:!0,composed:!0})),this.dragDayIndex=null,this.dragStartSlotIndex=null,this.dragEndSlotIndex=null}}connectedCallback(){super.connectedCallback(),window.addEventListener("mouseup",this.handleMouseUp)}disconnectedCallback(){window.removeEventListener("mouseup",this.handleMouseUp),super.disconnectedCallback()}handleMouseDown(t,e,a){if(a){if(this.role==="buyer")return;this.dispatchEvent(new CustomEvent("slot-click",{detail:{dateString:this.days[t].dateString,slot:this.days[t].slots[e],isBlocked:!0},bubbles:!0,composed:!0}));return}this.isDragging=!0,this.dragDayIndex=t,this.dragStartSlotIndex=e,this.dragEndSlotIndex=e}handleMouseEnter(t,e,a){this.isDragging&&t===this.dragDayIndex&&!a&&(this.dragEndSlotIndex=e)}isSlotSelected(t,e){return!this.selectedRange||this.selectedRange.dateString!==t?!1:e.start>=this.selectedRange.start&&e.end<=this.selectedRange.end}isSlotDragSelecting(t,e){if(!this.isDragging||t!==this.dragDayIndex)return!1;const a=Math.min(this.dragStartSlotIndex,this.dragEndSlotIndex),r=Math.max(this.dragStartSlotIndex,this.dragEndSlotIndex);return e>=a&&e<=r}render(){const t=new Date().toISOString().split("T")[0];return s.html`
      <div class="time-col">
        <div class="header-cell">Hora</div>
        ${this.slots.map(e=>s.html`<div class="slot-cell time-slot-label">${e.start}</div>`)}
      </div>

      ${this.days.map((e,a)=>{const r=e.dateString===t,i=new Intl.DateTimeFormat(this.locale,{weekday:"short"}).format(e.date);return s.html`
          <div class="day-col">
            <div class="header-cell ${r?"today":""}">
              <div>${i}</div>
              <div class="day-num">${e.dayNumber}</div>
            </div>
            
            ${e.slots.map((o,p)=>{var h,b;const c=o.isBlocked,n=this.isSlotSelected(e.dateString,o),g=this.isSlotDragSelecting(a,p);return s.html`
                <div
                  class=${k.classMap({"slot-cell":!0,available:!c,blocked:c,selected:n,"drag-selecting":g})}
                  @mousedown=${()=>this.handleMouseDown(a,p,c)}
                  @mouseenter=${()=>this.handleMouseEnter(a,p,c)}
                  title=${c&&((h=o.rule)!=null&&h.description)?o.rule.description:""}
                >
                  ${c?((b=o.rule)==null?void 0:b.description)||"Ocupado":n?"Reservado":""}
                </div>
              `})}
          </div>
        `})}
    `}};exports.GlatamCalendarWeekView.styles=s.css`
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
  `;x([l.property({type:Array})],exports.GlatamCalendarWeekView.prototype,"days",2);x([l.property({type:Array})],exports.GlatamCalendarWeekView.prototype,"slots",2);x([l.property({type:String})],exports.GlatamCalendarWeekView.prototype,"locale",2);x([l.property({type:Object})],exports.GlatamCalendarWeekView.prototype,"selectedRange",2);x([l.property({type:String})],exports.GlatamCalendarWeekView.prototype,"role",2);x([l.state()],exports.GlatamCalendarWeekView.prototype,"isDragging",2);x([l.state()],exports.GlatamCalendarWeekView.prototype,"dragDayIndex",2);x([l.state()],exports.GlatamCalendarWeekView.prototype,"dragStartSlotIndex",2);x([l.state()],exports.GlatamCalendarWeekView.prototype,"dragEndSlotIndex",2);exports.GlatamCalendarWeekView=x([l.customElement("glatam-calendar-week-view")],exports.GlatamCalendarWeekView);var T=Object.defineProperty,I=Object.getOwnPropertyDescriptor,w=(d,t,e,a)=>{for(var r=a>1?void 0:a?I(t,e):t,i=d.length-1,o;i>=0;i--)(o=d[i])&&(r=(a?o(t,e,r):o(r))||r);return a&&r&&T(t,e,r),r};exports.GlatamCalendarDayView=class extends s.LitElement{constructor(){super(...arguments),this.day=null,this.slots=[],this.locale="es",this.selectedRange=null,this.role="provider",this.isDragging=!1,this.dragStartSlotIndex=null,this.dragEndSlotIndex=null,this.handleMouseUp=()=>{if(!this.isDragging||!this.day||this.dragStartSlotIndex===null||this.dragEndSlotIndex===null){this.isDragging=!1;return}this.isDragging=!1;const t=Math.min(this.dragStartSlotIndex,this.dragEndSlotIndex),e=Math.max(this.dragStartSlotIndex,this.dragEndSlotIndex),a=this.day.slots.slice(t,e+1);a.some(r=>r.isBlocked)||this.dispatchEvent(new CustomEvent("range-select",{detail:{dateString:this.day.dateString,start:a[0].start,end:a[a.length-1].end},bubbles:!0,composed:!0})),this.dragStartSlotIndex=null,this.dragEndSlotIndex=null}}connectedCallback(){super.connectedCallback(),window.addEventListener("mouseup",this.handleMouseUp)}disconnectedCallback(){window.removeEventListener("mouseup",this.handleMouseUp),super.disconnectedCallback()}handleMouseDown(t,e){if(e&&this.day){if(this.role==="buyer")return;this.dispatchEvent(new CustomEvent("slot-click",{detail:{dateString:this.day.dateString,slot:this.day.slots[t],isBlocked:!0},bubbles:!0,composed:!0}));return}this.isDragging=!0,this.dragStartSlotIndex=t,this.dragEndSlotIndex=t}handleMouseEnter(t,e){this.isDragging&&!e&&(this.dragEndSlotIndex=t)}isSlotSelected(t){return!this.day||!this.selectedRange||this.selectedRange.dateString!==this.day.dateString?!1:t.start>=this.selectedRange.start&&t.end<=this.selectedRange.end}isSlotDragSelecting(t){if(!this.isDragging)return!1;const e=Math.min(this.dragStartSlotIndex,this.dragEndSlotIndex),a=Math.max(this.dragStartSlotIndex,this.dragEndSlotIndex);return t>=e&&t<=a}render(){if(!this.day)return s.html`<div>Cargando...</div>`;const t=this.day.dateString===new Date().toISOString().split("T")[0],e=new Intl.DateTimeFormat(this.locale,{weekday:"long",day:"numeric",month:"long"}).format(this.day.date);return s.html`
      <div class="time-col">
        <div class="header-cell">Hora</div>
        ${this.slots.map(a=>s.html`<div class="slot-cell time-slot-label">${a.start}</div>`)}
      </div>

      <div class="day-col">
        <div class="header-cell ${t?"today":""}">
          <div style="text-transform: capitalize;">${e}</div>
        </div>

        ${this.day.slots.map((a,r)=>{var c,n;const i=a.isBlocked,o=this.isSlotSelected(a),p=this.isSlotDragSelecting(r);return s.html`
            <div
              class=${k.classMap({"slot-cell":!0,available:!i,blocked:i,selected:o,"drag-selecting":p})}
              @mousedown=${()=>this.handleMouseDown(r,i)}
              @mouseenter=${()=>this.handleMouseEnter(r,i)}
              title=${i&&((c=a.rule)!=null&&c.description)?a.rule.description:""}
            >
              ${i?((n=a.rule)==null?void 0:n.description)||"Ocupado":o?"Reservado":""}
            </div>
          `})}
      </div>
    `}};exports.GlatamCalendarDayView.styles=s.css`
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
  `;w([l.property({type:Object})],exports.GlatamCalendarDayView.prototype,"day",2);w([l.property({type:Array})],exports.GlatamCalendarDayView.prototype,"slots",2);w([l.property({type:String})],exports.GlatamCalendarDayView.prototype,"locale",2);w([l.property({type:Object})],exports.GlatamCalendarDayView.prototype,"selectedRange",2);w([l.property({type:String})],exports.GlatamCalendarDayView.prototype,"role",2);w([l.state()],exports.GlatamCalendarDayView.prototype,"isDragging",2);w([l.state()],exports.GlatamCalendarDayView.prototype,"dragStartSlotIndex",2);w([l.state()],exports.GlatamCalendarDayView.prototype,"dragEndSlotIndex",2);exports.GlatamCalendarDayView=w([l.customElement("glatam-calendar-day-view")],exports.GlatamCalendarDayView);var V=Object.defineProperty,B=Object.getOwnPropertyDescriptor,f=(d,t,e,a)=>{for(var r=a>1?void 0:a?B(t,e):t,i=d.length-1,o;i>=0;i--)(o=d[i])&&(r=(a?o(t,e,r):o(r))||r);return a&&r&&V(t,e,r),r};exports.GlatamCalendarModal=class extends s.LitElement{constructor(){super(...arguments),this.open=!1,this.dateString="",this.startTime="",this.endTime="",this.isRange=!1,this.existingRule=null,this.description="",this.blockAllDay=!0,this.isRecurring=!1,this.selectedDays=[]}willUpdate(t){t.has("open")&&this.open&&(this.existingRule?(this.description="Bloqueo",this.blockAllDay=!this.existingRule.slots||this.existingRule.slots.length===0,this.isRecurring=this.existingRule.type==="weekly",this.selectedDays=this.existingRule.daysOfWeek||[]):(this.description="",this.blockAllDay=!this.isRange,this.isRecurring=!1,this.selectedDays=[new Date(this.dateString+"T00:00:00").getDay()]))}toggleDay(t){this.selectedDays.indexOf(t)>-1?this.selectedDays=this.selectedDays.filter(a=>a!==t):this.selectedDays=[...this.selectedDays,t]}handleSave(){const t={title:this.description||"Bloqueo",blockAllDay:this.blockAllDay,isRecurring:this.isRecurring,selectedDays:this.selectedDays,dateString:this.dateString,startTime:this.startTime,endTime:this.endTime};this.dispatchEvent(new CustomEvent("save-rule",{detail:t,bubbles:!0,composed:!0}))}handleDelete(){this.existingRule&&this.dispatchEvent(new CustomEvent("delete-rule",{detail:{id:this.existingRule.id},bubbles:!0,composed:!0}))}render(){const t=["D","L","M","M","J","V","S"],e=this.isRange?`${this.dateString} (${this.startTime} - ${this.endTime})`:this.dateString;return s.html`
      <div class=${k.classMap({"modal-overlay":!0,open:this.open})}>
        <div class="modal-content">
          <h3>${this.existingRule?"Gestionar Bloqueo":"Crear Bloqueo"}</h3>
          
          <div style="font-size: 0.85rem; color: var(--glatam-text-secondary);">
            Selección: <strong>${e}</strong>
          </div>

          <div class="form-group">
            <label>Descripción / Nota</label>
            <input 
              type="text" 
              .value=${this.description} 
              @input=${a=>this.description=a.target.value}
              placeholder="Ej. Reunión de equipo, Vacaciones" 
            />
          </div>

          <div class="switch-row">
            <label>Bloquear todo el día</label>
            <label class="switch">
              <input 
                type="checkbox" 
                .checked=${this.blockAllDay} 
                @change=${a=>this.blockAllDay=a.target.checked}
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
                @change=${a=>this.isRecurring=a.target.checked}
              />
              <span class="slider"></span>
            </label>
          </div>

          ${this.isRecurring?s.html`
                <div class="form-group">
                  <label>Repetir los días</label>
                  <div class="days-grid">
                    ${[1,2,3,4,5,6,0].map(a=>s.html`
                      <button 
                        class="day-btn ${this.selectedDays.includes(a)?"selected":""}"
                        @click=${()=>this.toggleDay(a)}
                      >
                        ${t[a]}
                      </button>
                    `)}
                  </div>
                </div>
              `:""}

          <div class="btn-actions">
            ${this.existingRule?s.html`<button class="btn btn-danger" @click=${this.handleDelete}>Eliminar</button>`:""}
            <button class="btn btn-cancel" @click=${()=>this.dispatchEvent(new CustomEvent("close"))}>Cancelar</button>
            <button class="btn btn-save" @click=${this.handleSave}>Guardar</button>
          </div>
        </div>
      </div>
    `}};exports.GlatamCalendarModal.styles=s.css`
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
  `;f([l.property({type:Boolean})],exports.GlatamCalendarModal.prototype,"open",2);f([l.property({type:String})],exports.GlatamCalendarModal.prototype,"dateString",2);f([l.property({type:String})],exports.GlatamCalendarModal.prototype,"startTime",2);f([l.property({type:String})],exports.GlatamCalendarModal.prototype,"endTime",2);f([l.property({type:Boolean})],exports.GlatamCalendarModal.prototype,"isRange",2);f([l.property({type:Object})],exports.GlatamCalendarModal.prototype,"existingRule",2);f([l.state()],exports.GlatamCalendarModal.prototype,"description",2);f([l.state()],exports.GlatamCalendarModal.prototype,"blockAllDay",2);f([l.state()],exports.GlatamCalendarModal.prototype,"isRecurring",2);f([l.state()],exports.GlatamCalendarModal.prototype,"selectedDays",2);exports.GlatamCalendarModal=f([l.customElement("glatam-calendar-modal")],exports.GlatamCalendarModal);var j=Object.defineProperty,_=Object.getOwnPropertyDescriptor,m=(d,t,e,a)=>{for(var r=a>1?void 0:a?_(t,e):t,i=d.length-1,o;i>=0;i--)(o=d[i])&&(r=(a?o(t,e,r):o(r))||r);return a&&r&&j(t,e,r),r};const N=[{start:"09:00",end:"10:00"},{start:"10:00",end:"11:00"},{start:"11:00",end:"12:00"},{start:"12:00",end:"13:00"},{start:"13:00",end:"14:00"},{start:"14:00",end:"15:00"},{start:"15:00",end:"16:00"},{start:"16:00",end:"17:00"},{start:"17:00",end:"18:00"}];exports.GlatamCalendar=class extends s.LitElement{constructor(){super(...arguments),this.role="provider",this.size="medium",this.view="month",this.locale="es",this.startOfWeekDay=0,this.rules=[],this.selectedDates=[],this.selectedRange=null,this.hostTimezone="America/Bogota",this.activeTimezone="local",this.slots=N,this.minDate="",this.maxDate="",this.showNeighboringMonth=!0,this.tileClassName=null,this.activeDate=new Date,this.localRules=[],this.darkMode=!1,this.modalOpen=!1,this.modalDateString="",this.modalStartTime="",this.modalEndTime="",this.modalIsRange=!1,this.modalExistingRule=null}firstUpdated(){this.darkMode=window.matchMedia("(prefers-color-scheme: dark)").matches,this.localRules=[...this.rules]}willUpdate(t){t.has("rules")&&this.rules.length>0&&this.localRules.length===0&&(this.localRules=[...this.rules])}updated(t){t.has("darkMode")&&this.classList.toggle("dark-mode",this.darkMode)}handlePrev(){const t=new Date(this.activeDate);this.view==="month"?t.setMonth(t.getMonth()-1):this.view==="week"?t.setDate(t.getDate()-7):t.setDate(t.getDate()-1),this.activeDate=t}handleNext(){const t=new Date(this.activeDate);this.view==="month"?t.setMonth(t.getMonth()+1):this.view==="week"?t.setDate(t.getDate()+7):t.setDate(t.getDate()+1),this.activeDate=t}getHeaderTitle(){const t=this.view==="month"?{month:"long",year:"numeric"}:this.view==="week"?{month:"short",year:"numeric"}:{day:"numeric",month:"long",year:"numeric"};return new Intl.DateTimeFormat(this.locale,t).format(this.activeDate)}handleDaySelect(t){const{dateString:e,isBlocked:a}=t.detail;this.role==="buyer"&&a||(this.activeDate=new Date(e+"T00:00:00"),this.view="day",this.dispatchEvent(new CustomEvent("date-selected",{detail:{dateString:e},bubbles:!0,composed:!0})))}handleRangeSelect(t){var h,b;const{dateString:e,start:a,end:r}=t.detail,i=this.activeTimezone==="local"?D(this.activeDate,this.hostTimezone,"local"):0,o=this.getDisplaySlots(i),p=o.findIndex(S=>S.start===a),c=o.findIndex(S=>S.end===r),n=((h=this.slots[p])==null?void 0:h.start)||a,g=((b=this.slots[c])==null?void 0:b.end)||r;if(this.role==="buyer"){this.selectedRange={dateString:e,start:a,end:r},this.dispatchEvent(new CustomEvent("booking-selected",{detail:{dateString:e,start:a,end:r,hostStart:n,hostEnd:g},bubbles:!0,composed:!0}));return}this.openModal(e,n,g,!0,null)}handleSlotClick(t){const{dateString:e,slot:a}=t.detail,r=new Date(e+"T00:00:00"),i=this.activeTimezone==="local"?D(this.activeDate,this.hostTimezone,"local"):0,o=this.getDisplaySlots(i),p=o.findIndex(g=>g.start===a.start),c=this.slots[p]||a;if(this.role==="buyer"){this.selectedRange={dateString:e,start:a.start,end:a.end},this.dispatchEvent(new CustomEvent("booking-selected",{detail:{dateString:e,start:a.start,end:a.end,hostStart:c.start,hostEnd:c.end},bubbles:!0,composed:!0}));return}const n=this.localRules.find(g=>y.isTimeBlocked(r,c,[g]));this.openModal(e,c.start,c.end,!0,n||null)}handleBlockDayAction(){const t=y.formatISODate(this.activeDate),e=this.localRules.find(a=>y.isTimeBlocked(this.activeDate,void 0,[a]));this.openModal(t,"","",!1,e||null)}openModal(t,e,a,r,i){this.modalDateString=t,this.modalStartTime=e,this.modalEndTime=a,this.modalIsRange=r,this.modalExistingRule=i,this.modalOpen=!0}handleSaveRule(t){const e=t.detail,a=this.modalExistingRule?this.modalExistingRule.id:`rule-${Date.now()}`,r={id:a,type:e.isRecurring?"weekly":"date-range",slots:e.blockAllDay?void 0:[{start:e.startTime,end:e.endTime}],daysOfWeek:e.isRecurring?e.selectedDays:void 0,startDate:e.isRecurring?void 0:e.dateString,endDate:e.isRecurring?void 0:e.dateString,description:e.title};this.localRules=this.modalExistingRule?this.localRules.map(i=>i.id===a?r:i):[...this.localRules,r],this.modalOpen=!1,this.dispatchEvent(new CustomEvent("rules-changed",{detail:{rules:this.localRules},bubbles:!0,composed:!0}))}handleDeleteRule(t){this.localRules=this.localRules.filter(e=>e.id!==t.detail.id),this.modalOpen=!1,this.dispatchEvent(new CustomEvent("rules-changed",{detail:{rules:this.localRules},bubbles:!0,composed:!0}))}getDisplaySlots(t){return t===0?this.slots:this.slots.map(e=>{const a=G(e,t),r=a.dayShift>0?" (+1d)":a.dayShift<0?" (-1d)":"";return{start:a.start+r,end:a.end+r}})}render(){var c;const t=this.activeDate.getFullYear(),e=this.activeDate.getMonth(),a=y.isTimeBlocked(this.activeDate,void 0,this.localRules),r=this.activeTimezone==="local"?D(this.activeDate,this.hostTimezone,"local"):0,i=this.getDisplaySlots(r),o=n=>n.map(g=>({...g,slots:g.slots.map((h,b)=>{var S,M;return{...h,start:((S=i[b])==null?void 0:S.start)||h.start,end:((M=i[b])==null?void 0:M.end)||h.end}})})),p=((c=this.hostTimezone.split("/").pop())==null?void 0:c.replace("_"," "))||"Anfitrión";return s.html`
      <div class="calendar-header">
        <div class="nav-group">
          <button class="btn" @click=${()=>this.activeDate=new Date}>Hoy</button>
          <button class="btn" @click=${this.handlePrev}>&lt;</button>
          <button class="btn" @click=${this.handleNext}>&gt;</button>
          <span class="nav-title" style="text-transform: capitalize;">${this.getHeaderTitle()}</span>
        </div>
        
        <div class="view-group">
          ${this.role==="provider"?s.html`
            <div class="timezone-badge">
              🌐 Zona:
              <select class="timezone-select" @change=${n=>this.activeTimezone=n.target.value}>
                <option value="local" ?selected=${this.activeTimezone==="local"}>Mi Hora</option>
                <option value="host" ?selected=${this.activeTimezone==="host"}>Hora ${p}</option>
              </select>
            </div>
          `:""}
          ${this.role==="provider"&&this.view==="day"?s.html`<button class="btn btn-primary" @click=${this.handleBlockDayAction} style="margin-right: 8px;">${a?"Liberar Día":"Bloquear Día"}</button>`:""}
          <button class="btn" @click=${()=>this.darkMode=!this.darkMode} style="margin-right: 8px;">${this.darkMode?"☀️":"🌙"}</button>
          <div class="btn-group">
            <button class="btn ${this.view==="month"?"active":""}" @click=${()=>this.view="month"}>Mes</button>
            <button class="btn ${this.view==="week"?"active":""}" @click=${()=>this.view="week"}>Semana</button>
            <button class="btn ${this.view==="day"?"active":""}" @click=${()=>this.view="day"}>Día</button>
          </div>
        </div>
      </div>

      <div class="calendar-body">
        ${this.view==="month"?s.html`<glatam-calendar-month-view .days=${y.generateMonthDays(t,e,this.localRules,this.slots,this.startOfWeekDay)} .locale=${this.locale} .startOfWeekDay=${this.startOfWeekDay} .role=${this.role} .size=${this.size} .minDate=${this.minDate} .maxDate=${this.maxDate} .showNeighboringMonth=${this.showNeighboringMonth} .tileClassName=${this.tileClassName} @day-select=${this.handleDaySelect}></glatam-calendar-month-view>`:this.view==="week"?s.html`<glatam-calendar-week-view .days=${o(y.generateWeekDays(this.activeDate,this.localRules,this.slots,this.startOfWeekDay))} .slots=${i} .locale=${this.locale} .selectedRange=${this.selectedRange} .role=${this.role} @range-select=${this.handleRangeSelect} @slot-click=${this.handleSlotClick}></glatam-calendar-week-view>`:s.html`<glatam-calendar-day-view .day=${o(y.generateWeekDays(this.activeDate,this.localRules,this.slots,this.startOfWeekDay)).find(n=>n.dateString===y.formatISODate(this.activeDate))||null} .slots=${i} .locale=${this.locale} .selectedRange=${this.selectedRange} .role=${this.role} @range-select=${this.handleRangeSelect} @slot-click=${this.handleSlotClick}></glatam-calendar-day-view>`}
      </div>

      <glatam-calendar-modal
        .open=${this.modalOpen} .dateString=${this.modalDateString} .startTime=${this.modalStartTime} .endTime=${this.modalEndTime}
        .isRange=${this.modalIsRange} .existingRule=${this.modalExistingRule} @save-rule=${this.handleSaveRule}
        @delete-rule=${this.handleDeleteRule} @close=${()=>this.modalOpen=!1}
      ></glatam-calendar-modal>
    `}};exports.GlatamCalendar.styles=[C,$];m([l.property({type:String})],exports.GlatamCalendar.prototype,"role",2);m([l.property({type:String,reflect:!0})],exports.GlatamCalendar.prototype,"size",2);m([l.property({type:String})],exports.GlatamCalendar.prototype,"view",2);m([l.property({type:String})],exports.GlatamCalendar.prototype,"locale",2);m([l.property({type:Number})],exports.GlatamCalendar.prototype,"startOfWeekDay",2);m([l.property({type:Array})],exports.GlatamCalendar.prototype,"rules",2);m([l.property({type:Array})],exports.GlatamCalendar.prototype,"selectedDates",2);m([l.property({type:Object})],exports.GlatamCalendar.prototype,"selectedRange",2);m([l.property({type:String})],exports.GlatamCalendar.prototype,"hostTimezone",2);m([l.property({type:String})],exports.GlatamCalendar.prototype,"activeTimezone",2);m([l.property({type:Array})],exports.GlatamCalendar.prototype,"slots",2);m([l.property({type:String})],exports.GlatamCalendar.prototype,"minDate",2);m([l.property({type:String})],exports.GlatamCalendar.prototype,"maxDate",2);m([l.property({type:Boolean})],exports.GlatamCalendar.prototype,"showNeighboringMonth",2);m([l.property({attribute:!1})],exports.GlatamCalendar.prototype,"tileClassName",2);m([l.state()],exports.GlatamCalendar.prototype,"activeDate",2);m([l.state()],exports.GlatamCalendar.prototype,"localRules",2);m([l.state()],exports.GlatamCalendar.prototype,"darkMode",2);m([l.state()],exports.GlatamCalendar.prototype,"modalOpen",2);m([l.state()],exports.GlatamCalendar.prototype,"modalDateString",2);m([l.state()],exports.GlatamCalendar.prototype,"modalStartTime",2);m([l.state()],exports.GlatamCalendar.prototype,"modalEndTime",2);m([l.state()],exports.GlatamCalendar.prototype,"modalIsRange",2);m([l.state()],exports.GlatamCalendar.prototype,"modalExistingRule",2);exports.GlatamCalendar=m([l.customElement("glatam-calendar")],exports.GlatamCalendar);var W=Object.defineProperty,P=Object.getOwnPropertyDescriptor,u=(d,t,e,a)=>{for(var r=a>1?void 0:a?P(t,e):t,i=d.length-1,o;i>=0;i--)(o=d[i])&&(r=(a?o(t,e,r):o(r))||r);return a&&r&&W(t,e,r),r};exports.GlatamCalendarMini=class extends s.LitElement{constructor(){super(...arguments),this.role="buyer",this.locale="es",this.startOfWeekDay=0,this.rules=[],this.selectedRange=null,this.size="medium",this.hostTimezone="America/Bogota",this.activeTimezone="local",this.minDate="",this.maxDate="",this.showNeighboringMonth=!0,this.tileClassName=null,this.slots=[{start:"09:00",end:"10:00"},{start:"10:00",end:"11:00"},{start:"11:00",end:"12:00"},{start:"12:00",end:"13:00"},{start:"13:00",end:"14:00"},{start:"14:00",end:"15:00"},{start:"15:00",end:"16:00"},{start:"16:00",end:"17:00"},{start:"17:00",end:"18:00"}],this.activeDate=new Date,this.dropdownOpen=!1,this.dropdownSelectedDateString=""}handleDropdownDaySelect(t){this.dropdownSelectedDateString=t.detail.dateString}selectDropdownSlot(t){const e={dateString:this.dropdownSelectedDateString,start:t.displayStart,end:t.displayEnd,hostStart:t.start,hostEnd:t.end};this.selectedRange={dateString:this.dropdownSelectedDateString,start:t.displayStart,end:t.displayEnd},this.dispatchEvent(new CustomEvent("booking-selected",{detail:e,bubbles:!0,composed:!0})),this.dropdownOpen=!1,this.dropdownSelectedDateString=""}render(){const t=this.selectedRange?`Reserva: ${this.selectedRange.dateString} (${this.selectedRange.start} - ${this.selectedRange.end})`:"Seleccionar Fecha y Hora",e=this.activeDate.getFullYear(),a=this.activeDate.getMonth(),r=this.dropdownSelectedDateString?new Date(this.dropdownSelectedDateString+"T00:00:00"):null,i=r&&this.activeTimezone==="local"?D(r,this.hostTimezone,"local"):0,o=r?this.slots.map(p=>{const c=y.isTimeBlocked(r,p,this.rules),n=G(p,i),g=n.dayShift>0?" (+1d)":n.dayShift<0?" (-1d)":"";return{...p,displayStart:n.start+g,displayEnd:n.end+g,isBlocked:c}}):[];return s.html`
      <div class="dropdown-container">
        <button class="btn btn-primary dropdown-toggle" @click=${()=>this.dropdownOpen=!this.dropdownOpen}>
          <span>${t}</span> <span>${this.dropdownOpen?"▲":"▼"}</span>
        </button>

        ${this.dropdownOpen?s.html`
              <div class="dropdown-card" style="--glatam-day-min-height: 38px;">
                ${this.dropdownSelectedDateString?s.html`
                      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid var(--glatam-border); padding-bottom:8px;">
                        <button class="btn" style="height:28px; padding:0 8px; font-size:0.75rem;" @click=${()=>this.dropdownSelectedDateString=""}>&lt; Volver</button>
                        <span style="font-size:0.8rem; font-weight:600; color: var(--glatam-text);">${this.dropdownSelectedDateString}</span>
                      </div>
                      <div class="slot-list">
                        ${o.map(p=>s.html`
                          <button
                            class="slot-btn ${p.isBlocked?"blocked":""}"
                            ?disabled=${p.isBlocked}
                            @click=${()=>this.selectDropdownSlot(p)}
                          >
                            ${p.displayStart} - ${p.displayEnd} ${p.isBlocked?"(Ocupado)":""}
                          </button>
                        `)}
                      </div>
                    `:s.html`
                      <div style="font-weight:600; font-size:0.9rem; text-align:center; color: var(--glatam-text);">Selecciona un Día</div>
                      <glatam-calendar-month-view
                        .days=${y.generateMonthDays(e,a,this.rules,this.slots,this.startOfWeekDay)}
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
            `:""}
      </div>
    `}};exports.GlatamCalendarMini.styles=[C,$,s.css`
      :host {
        display: inline-block;
        background: transparent;
        border: none;
        padding: 0;
        box-shadow: none;
        width: 100%;
      }
    `];u([l.property({type:String})],exports.GlatamCalendarMini.prototype,"role",2);u([l.property({type:String})],exports.GlatamCalendarMini.prototype,"locale",2);u([l.property({type:Number})],exports.GlatamCalendarMini.prototype,"startOfWeekDay",2);u([l.property({type:Array})],exports.GlatamCalendarMini.prototype,"rules",2);u([l.property({type:Object})],exports.GlatamCalendarMini.prototype,"selectedRange",2);u([l.property({type:String,reflect:!0})],exports.GlatamCalendarMini.prototype,"size",2);u([l.property({type:String})],exports.GlatamCalendarMini.prototype,"hostTimezone",2);u([l.property({type:String})],exports.GlatamCalendarMini.prototype,"activeTimezone",2);u([l.property({type:String})],exports.GlatamCalendarMini.prototype,"minDate",2);u([l.property({type:String})],exports.GlatamCalendarMini.prototype,"maxDate",2);u([l.property({type:Boolean})],exports.GlatamCalendarMini.prototype,"showNeighboringMonth",2);u([l.property({attribute:!1})],exports.GlatamCalendarMini.prototype,"tileClassName",2);u([l.property({type:Array})],exports.GlatamCalendarMini.prototype,"slots",2);u([l.state()],exports.GlatamCalendarMini.prototype,"activeDate",2);u([l.state()],exports.GlatamCalendarMini.prototype,"dropdownOpen",2);u([l.state()],exports.GlatamCalendarMini.prototype,"dropdownSelectedDateString",2);exports.GlatamCalendarMini=u([l.customElement("glatam-calendar-mini")],exports.GlatamCalendarMini);Object.defineProperty(exports,"formatISODate",{enumerable:!0,get:()=>y.formatISODate});Object.defineProperty(exports,"isTimeBlocked",{enumerable:!0,get:()=>y.isTimeBlocked});Object.defineProperty(exports,"parseISODate",{enumerable:!0,get:()=>y.parseISODate});exports.calendarStyles=$;exports.variablesStyles=C;
