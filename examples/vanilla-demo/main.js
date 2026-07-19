import '@glatam/calendar-ui';

document.addEventListener('DOMContentLoaded', () => {
  const calendar = document.getElementById('my-calendar');
  const calendarMini = document.getElementById('my-calendar-mini');
  const roleSelect = document.getElementById('role-select');
  const sizeSelect = document.getElementById('size-select');
  const variantSelect = document.getElementById('variant-select');
  const output = document.getElementById('selection-output');
  const rulesList = document.querySelector('aside ul');

  if (!calendar || !calendarMini || !roleSelect || !sizeSelect || !variantSelect || !output || !rulesList) return;

  const initialRules = [
    { id: 'weekend-block', type: 'weekly', daysOfWeek: [0, 6] },
    { id: 'weekly-meeting', type: 'weekly', daysOfWeek: [1], slots: [{ start: '14:00', end: '16:00' }] }
  ];

  const today = new Date();
  const threeMonthsLater = new Date();
  threeMonthsLater.setMonth(today.getMonth() + 3);

  const formatDateStr = (d) => {
    const y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, '0'), dayVal = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${dayVal}`;
  };

  // Set initial settings on both components
  [calendar, calendarMini].forEach(cal => {
    cal.rules = initialRules;
    cal.locale = 'es';
    cal.startOfWeekDay = 1;
    cal.minDate = formatDateStr(today);
    cal.maxDate = formatDateStr(threeMonthsLater);
    cal.showNeighboringMonth = true;
    cal.tileClassName = ({ date }) => date.getDay() === 5 ? 'casual-friday' : '';
  });

  const renderRulesSidebar = (rules) => {
    rulesList.innerHTML = '';
    if (rules.length === 0) {
      rulesList.innerHTML = '<li style="color: var(--glatam-text-secondary); font-style: italic;">Sin bloqueos activos.</li>';
      return;
    }
    rules.forEach((rule) => {
      const li = document.createElement('li');
      let details = rule.type === 'weekly'
        ? `Semanal [${rule.daysOfWeek.map(d => ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'][d]).join(', ')}]`
        : `Rango: ${rule.startDate}`;
      details += rule.slots && rule.slots.length > 0
        ? ` (${rule.slots.map(s => `${s.start}-${s.end}`).join(', ')})`
        : ` (Todo el día)`;
      li.innerHTML = `<strong>${rule.id.substring(0, 8)}</strong>: ${details}`;
      rulesList.appendChild(li);
    });
  };

  renderRulesSidebar(initialRules);

  // Sync rules between components
  calendar.addEventListener('rules-changed', (e) => {
    calendarMini.rules = e.detail.rules;
    renderRulesSidebar(e.detail.rules);
  });
  calendarMini.addEventListener('rules-changed', (e) => {
    calendar.rules = e.detail.rules;
    renderRulesSidebar(e.detail.rules);
  });

  // Handle buyer booking selections
  const handleBookingSelected = (e) => {
    const { dateString, start, end } = e.detail;
    output.innerHTML = `
      <div class="result-item" style="border-left-color: #ff9500; background-color: rgba(255, 149, 0, 0.08);">
        <strong style="color: #ff9500;">🎉 ¡Reserva Realizada (Buyer)!</strong>
        <div>Fecha: <strong>${dateString}</strong></div>
        <div>Horario: <strong>${start} - ${end}</strong></div>
        <div style="font-size: 0.8rem; color: #86868b; margin-top: 6px;">
          (Emitió el evento <strong>'booking-selected'</strong> para guardar la compra)
        </div>
      </div>
    `;
  };
  calendar.addEventListener('booking-selected', handleBookingSelected);
  calendarMini.addEventListener('booking-selected', handleBookingSelected);

  calendar.addEventListener('date-selected', (e) => {
    if (calendar.role === 'buyer') return;
    output.innerHTML = `
      <div class="result-item" style="border-left-color: #34c759; background-color: rgba(52, 199, 89, 0.08);">
        <strong>Día Seleccionado:</strong>
        <div>${e.detail.dateString}</div>
        <div style="font-size: 0.8rem; color: #86868b; margin-top: 4px;">(Se abrió el modal para bloquear/liberar)</div>
      </div>
    `;
  });

  calendar.addEventListener('range-selected', (e) => {
    if (calendar.role === 'buyer') return;
    output.innerHTML = `
      <div class="result-item" style="border-left-color: #5856d6; background-color: rgba(88, 86, 214, 0.08);">
        <strong>Rango Seleccionado:</strong>
        <div>Día: ${e.detail.dateString}</div>
        <div>Horario: ${e.detail.start} - ${e.detail.end}</div>
      </div>
    `;
  });

  roleSelect.addEventListener('change', () => {
    const role = roleSelect.value;
    calendar.role = role;
    calendarMini.role = role;
    output.innerHTML = role === 'buyer'
      ? `<div class="result-item" style="border-left-color: #ff9500;"><strong>Modo Comprador Activo</strong><div>Selecciona una celda u hora libre para reservar.</div></div>`
      : `<div class="result-item" style="border-left-color: #5856d6;"><strong>Modo Anfitrión Activo</strong><div>Haz clic o arrastra para crear/eliminar bloqueos.</div></div>`;
  });

  sizeSelect.addEventListener('change', () => {
    const size = sizeSelect.value;
    calendar.setAttribute('size', size);
    calendarMini.setAttribute('size', size);
  });

  variantSelect.addEventListener('change', () => {
    if (variantSelect.value === 'mini') {
      calendar.classList.add('hidden');
      calendarMini.classList.remove('hidden');
      calendarMini.rules = calendar.rules;
    } else {
      calendarMini.classList.add('hidden');
      calendar.classList.remove('hidden');
      calendar.rules = calendarMini.rules;
    }
  });
});
