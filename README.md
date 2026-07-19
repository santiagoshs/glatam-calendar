# 📖 Guía de Referencia de la API: @glatam/calendar

Esta es la documentación técnica oficial de la suite `@glatam/calendar`. Diseñada bajo estándares modernos, minimalistas (estilo Apple) y de alto rendimiento.

---

## 🔒 1. Estabilidad y Garantía de Producción

La librería está lista para producción en e-commerce y planificadores corporativos mediante tres pilares:

1.  **Pruebas Automatizadas**: Algoritmos de disponibilidad y colisiones horarias en `@glatam/calendar-core` cubiertos por tests unitarios en **Vitest**.
2.  **Aislamiento Total (Shadow DOM)**: Utiliza encapsulación nativa a nivel del navegador, eliminando colisiones de CSS externas.
3.  **Seguridad SSR (Server-Side Rendering)**: Compilado en ESM y CommonJS sin referencias directas a `window` o `document` a nivel de módulo. Compatible con **Next.js (App Router)**, **Nuxt 3**, **Astro** y **SvelteKit**.

---

## 📦 2. Instalación (Installation)

Puedes instalar la suite usando tu gestor de paquetes favorito:

```bash
# Con npm
npm install @glatam/calendar-core @glatam/calendar-ui

# Con yarn
yarn add @glatam/calendar-core @glatam/calendar-ui

# Con pnpm
pnpm add @glatam/calendar-core @glatam/calendar-ui
```

---

## ⚙️ 3. Referencia de API: `<glatam-calendar>`

El componente principal para la cuadrícula completa del calendario.

### Propiedades y Atributos (Props)

| Propiedad (JS) | Atributo (HTML) | Tipo | Por Defecto | Descripción |
| :--- | :--- | :--- | :--- | :--- |
| `role` | `role` | `'provider' \| 'buyer'` | `'provider'` | `provider` permite editar disponibilidad; `buyer` deshabilita bloqueos y permite reservar slots. |
| `view` | `view` | `'month' \| 'week' \| 'day'` | `'month'` | Establece la vista por defecto. |
| `locale` | `locale` | `string` | `'es'` | Código de idioma (IETF tag) para formatear textos de forma nativa. |
| `startOfWeekDay` | `start-of-week-day` | `number` | `0` | Primer día de la semana (`0` = Domingo, `1` = Lunes). |
| `rules` | — | `BlockingRule[]` | `[]` | Array de reglas de bloqueo (ej. fines de semana o tareas). |
| `slots` | — | `TimeSlot[]` | *(9am a 6pm)* | Array de bloques horarios disponibles en el día. |
| `minDate` | `min-date` | `string` | `''` | Fecha mínima de selección (`YYYY-MM-DD`). |
| `maxDate` | `max-date` | `string` | `''` | Fecha máxima de selección (`YYYY-MM-DD`). |
| `showNeighboringMonth`| `show-neighboring-month`| `boolean` | `true` | Si es `false`, oculta los números del mes vecino. |
| `hostTimezone` | `host-timezone` | `string` | `'America/Bogota'` | Timezone base del servidor o anfitrión de la experiencia. |
| `activeTimezone` | `active-timezone` | `'host' \| 'local'` | `'local'` | `'local'` convierte la visualización horaria del grid a la hora local del dispositivo. |
| `tileClassName` | — | `Function` | `null` | Callback `({ date, dateString }) => string` para añadir clases a celdas mensuales. |

### Eventos (Events)

| Nombre | Datos en `event.detail` | Descripción |
| :--- | :--- | :--- |
| **`booking-selected`** | `{ dateString, start, end, hostStart, hostEnd }` | El comprador seleccionó un slot disponible. Devuelve la hora local del cliente y la del host. |
| **`rules-changed`** | `{ rules: BlockingRule[] }` | El administrador guardó un bloqueo o tarea. |
| **`date-selected`** | `{ dateString: string }` | Se presionó un día en la vista mensual. |
| **`range-selected`** | `{ dateString: string, start: string, end: string }` | Se arrastró un rango en vistas semana/día. |

---

## ⚙️ 4. Referencia de API: `<glatam-calendar-mini>`

El componente de checkout rápido tipo popover.

### Propiedades y Atributos (Props)

| Propiedad (JS) | Atributo (HTML) | Tipo | Por Defecto | Descripción |
| :--- | :--- | :--- | :--- | :--- |
| `role` | `role` | `'provider' \| 'buyer'` | `'buyer'` | Por defecto en modo comprador para selección rápida. |
| `locale` | `locale` | `string` | `'es'` | Código de idioma regional. |
| `rules` | — | `BlockingRule[]` | `[]` | Reglas de disponibilidad cargadas desde tu API. |
| `slots` | — | `TimeSlot[]` | *(9am a 6pm)* | Horarios de atención diarios. |
| `minDate` | `min-date` | `string` | `''` | Límite inferior de selección (`YYYY-MM-DD`). |
| `maxDate` | `max-date` | `string` | `''` | Límite superior de selección (`YYYY-MM-DD`). |
| `hostTimezone` | `host-timezone` | `string` | `'America/Bogota'` | Timezone de la sede original del anfitrión. |
| `activeTimezone` | `active-timezone` | `'host' \| 'local'` | `'local'` | Si está en `'local'`, convierte los slots de hora al huso del cliente. |

### Eventos (Events)

| Nombre | Datos en `event.detail` | Descripción |
| :--- | :--- | :--- |
| **`booking-selected`** | `{ dateString, start, end, hostStart, hostEnd }` | El comprador seleccionó una fecha y hora. |

---

## 🎨 5. CSS Custom Properties y Shadow Parts

### Variables CSS (Paleta de Colores y Proporciones)
Inserta estas variables en tu CSS principal para cambiar la apariencia del calendario:

```css
glatam-calendar, glatam-calendar-mini {
  --glatam-primary: #0071e3;            /* Color principal (Apple Blue) */
  --glatam-primary-hover: #0077ed;
  --glatam-bg: #ffffff;                 /* Fondo principal de celdas */
  --glatam-surface: #f5f5f7;            /* Cabeceras y botones */
  --glatam-border: #e5e5ea;             /* Líneas divisorias */
  --glatam-text: #1d1d1f;               /* Texto principal */
  --glatam-text-secondary: #86868b;     /* Leyendas y subtextos */
  --glatam-grid-border-radius: 12px;
}
```

### CSS Shadow Parts
Puedes aplicar estilos a las celdas mensuales desde tu CSS global usando el selector `::part()`.

Ejemplo para pintar los viernes con borde verde:
```css
glatam-calendar::part(casual-friday), glatam-calendar-mini::part(casual-friday) {
  border: 2px solid #34c759 !important;
  background-color: rgba(52, 199, 89, 0.05);
}
```

---

## 💻 6. Ejemplos de Implementación en Frameworks

### A) HTML Puro + Vanilla JS
```html
<glatam-calendar id="calendar" role="provider" min-date="2026-07-01"></glatam-calendar>

<script type="module">
  import '@glatam/calendar-ui';
  const cal = document.getElementById('calendar');
  cal.rules = [
    { id: '1', type: 'weekly', daysOfWeek: [0, 6], description: 'Cerrado Fin de Semana' }
  ];
  cal.addEventListener('rules-changed', (e) => {
    console.log('Cambios guardados:', e.detail.rules);
  });
</script>
```

### B) React 18 / Next.js
*Para Next.js App Router, añade `"use client"` en la parte superior del archivo.*

```tsx
import { useEffect, useRef } from 'react';
import '@glatam/calendar-ui';

export default function ReactCalendar() {
  const ref = useRef<any>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.rules = [{ id: 't1', type: 'date-range', startDate: '2026-07-25', description: 'Scrum' }];
      ref.current.tileClassName = ({ date }: { date: Date }) => date.getDay() === 5 ? 'casual-friday' : '';
    }
  }, []);

  return <glatam-calendar ref={ref} role="buyer" locale="es" min-date="2026-07-18" />;
}
```

### C) Vue 3
```html
<template>
  <glatam-calendar role="provider" locale="es" .rules="myRules" :tileClassName="styleFriday" @rules-changed="onSave" />
</template>

<script setup>
import { ref } from 'vue';
import '@glatam/calendar-ui';

const myRules = ref([{ id: 'h1', type: 'date-range', startDate: '2026-07-28', description: 'Feriado' }]);
const styleFriday = ({ date }) => date.getDay() === 5 ? 'casual-friday' : '';
const onSave = (e) => { myRules.value = e.detail.rules; };
</script>
```

### D) Svelte
```html
<script>
  import { onMount } from 'svelte';
  import '@glatam/calendar-ui';
  let calElement;

  onMount(() => {
    calElement.rules = [{ id: 's1', type: 'weekly', daysOfWeek: [0, 6], description: 'Cerrado' }];
  });

  function handleBooking(e) {
    const { dateString, start } = e.detail;
    alert(`Reservado para el ${dateString} a las ${start}`);
  }
</script>

<glatam-calendar bind:this={calElement} role="buyer" locale="es" on:booking-selected={handleBooking} />
```
