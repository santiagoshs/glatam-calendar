# 📖 API Reference Guide: @glatam/calendar-ui

This is the official technical documentation for the `@glatam/calendar-ui` package. Designed under modern, minimalist (Apple-style), and high-performance standards.

---

## ⚙️ 1. API Reference: `<glatam-calendar>`

The primary calendar component displaying the full grid.

### Properties and Attributes (Props)

| JS Property | HTML Attribute | Type | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `role` | `role` | `'provider' \| 'buyer'` | `'provider'` | `provider` allows editing availability; `buyer` disables blocked slots and enables client booking. |
| `view` | `view` | `'month' \| 'week' \| 'day'` | `'month'` | Sets the active view. |
| `locale` | `locale` | `string` | `'es'` | Locale code (IETF tag) for native header and date formatting. |
| `startOfWeekDay` | `start-of-week-day` | `number` | `0` | First day of the week (`0` = Sunday, `1` = Monday). |
| `rules` | — | `BlockingRule[]` | `[]` | Array of blocking rules (e.g., weekends, holidays). *JS only.* |
| `slots` | — | `TimeSlot[]` | *(9am to 6pm)* | Array of daily operating hour slots. *JS only.* |
| `minDate` | `min-date` | `string` | `''` | Minimum selectable date in `YYYY-MM-DD` format. |
| `maxDate` | `max-date` | `string` | `''` | Maximum selectable date in `YYYY-MM-DD` format. |
| `showNeighboringMonth`| `show-neighboring-month`| `boolean` | `true` | If `false`, hides neighboring month dates. |
| `hostTimezone` | `host-timezone` | `string` | `'America/Bogota'` | Timezone of the host or experience venue. |
| `activeTimezone` | `active-timezone` | `'host' \| 'local'` | `'local'` | `'local'` automatically shifts grid slots to the buyer's local time. |
| `tileClassName` | — | `Function` | `null` | Callback `({ date, dateString }) => string` to add classes to monthly cells. |

### Events

| Event Name | Detail Payload (`event.detail`) | Description |
| :--- | :--- | :--- |
| **`booking-selected`** | `{ dateString, start, end, hostStart, hostEnd }` | Fired when a buyer clicks an available slot. Outputs client local and host reference times. |
| **`rules-changed`** | `{ rules: BlockingRule[] }` | Fired when the provider saves a block or task. |
| **`date-selected`** | `{ dateString: string }` | Fired when a month cell is clicked. |
| **`range-selected`** | `{ dateString: string, start: string, end: string }` | Fired when dragging a slot range in week/day views. |

---

## ⚙️ 2. API Reference: `<glatam-calendar-mini>`

The inline checkout popup calendar component for compact booking dropdowns.

### New Features in `v1.0.5`:
- **Interactive Month Navigation**: Includes localized Month & Year header display with `<` and `>` control buttons.
- **Mobile Touch & Swipe Support**: Native touch swipe gestures (`swipe left` for next month, `swipe right` for previous month) on mobile screens.

### Properties and Attributes (Props)

| JS Property | HTML Attribute | Type | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `role` | `role` | `'provider' \| 'buyer'` | `'buyer'` | Defaults to buyer mode for quick selection. |
| `locale` | `locale` | `string` | `'es'` | Regional language code. |
| `rules` | — | `BlockingRule[]` | `[]` | Availability rules loaded from your database. |
| `slots` | — | `TimeSlot[]` | *(9am to 6pm)* | Daily operating hour slots. |
| `minDate` | `min-date` | `string` | `''` | Minimum selectable date (`YYYY-MM-DD`). |
| `maxDate` | `max-date` | `string` | `''` | Maximum selectable date (`YYYY-MM-DD`). |
| `hostTimezone` | `host-timezone` | `string` | `'America/Bogota'` | Host timezone reference. |
| `activeTimezone` | `active-timezone` | `'host' \| 'local'` | `'local'` | Converts slot times to client local time when set to `'local'`. |

### Events

| Event Name | Detail Payload (`event.detail`) | Description |
| :--- | :--- | :--- |
| **`booking-selected`** | `{ dateString, start, end, hostStart, hostEnd }` | Fired when a slot is booked. |

---

## 🎨 3. CSS Custom Properties and Shadow Parts

### CSS Variables (Theming)
Customize the calendar theme by declaring these variables in your global CSS stylesheet:

```css
glatam-calendar, glatam-calendar-mini {
  --glatam-primary: #0071e3;            /* Apple Blue branding color */
  --glatam-primary-hover: #0077ed;
  --glatam-bg: #ffffff;                 /* Grid cell background */
  --glatam-surface: #f5f5f7;            /* Header and button background */
  --glatam-border: #e5e5ea;             /* Grid line color */
  --glatam-text: #1d1d1f;               /* Primary text color */
  --glatam-text-secondary: #86868b;     /* Subtexts and captions */
  --glatam-grid-border-radius: 12px;
}
```

### CSS Shadow Parts
Target month cells from your global CSS using the `::part()` selector.

Example to highlight Fridays with a green border:
```css
glatam-calendar::part(casual-friday), glatam-calendar-mini::part(casual-friday) {
  border: 2px solid #34c759 !important;
  background-color: rgba(52, 199, 89, 0.05);
}
```

---

## 💻 4. Integration Examples

### A) HTML + Vanilla JS
```html
<glatam-calendar id="calendar" role="provider" min-date="2026-07-01"></glatam-calendar>

<script type="module">
  import '@glatam/calendar-ui';
  const cal = document.getElementById('calendar');
  cal.rules = [
    { id: '1', type: 'weekly', daysOfWeek: [0, 6], description: 'Closed on Weekends' }
  ];
  cal.addEventListener('rules-changed', (e) => {
    console.log('Saved availability rules:', e.detail.rules);
  });
</script>
```

### B) React 18 / Next.js
*For Next.js App Router, add `"use client"` at the top of the file.*

```tsx
import { useEffect, useRef } from 'react';
import '@glatam/calendar-ui';

export default function ReactCalendar() {
  const ref = useRef<any>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.rules = [{ id: 't1', type: 'date-range', startDate: '2026-07-25', description: 'Daily Scrum' }];
      ref.current.tileClassName = ({ date }: { date: Date }) => date.getDay() === 5 ? 'casual-friday' : '';
    }
  }, []);

  return <glatam-calendar ref={ref} role="buyer" locale="en" min-date="2026-07-18" />;
}
```
