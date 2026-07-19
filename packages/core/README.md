# ⚙️ Core Logic Engine: @glatam/calendar-core

This is the pure logical calculation engine for the `@glatam/calendar` suite. It is responsible for availability evaluations, timezone translations, and slot collision algorithms. It contains no DOM/UI dependencies and is completely platform-agnostic.

---

## 🛠️ Architecture: Strategy Pattern

The core scheduler utilizes a **Strategy Pattern** to evaluate availability rules:

1.  **Weekly Strategy (`WeeklyStrategy`)**: Handles recurring availability or blockages on specific days of the week (e.g., "Every Monday from 2:00 PM to 4:00 PM").
2.  **Date Range Strategy (`DateRangeStrategy`)**: Handles specific date-bound blockages or tasks (e.g., "Out of office from 2026-07-25 to 2026-07-28").
3.  **Strategy Factory (`StrategyFactory`)**: Automatically instantiates the correct parser based on the rule payload type.

---

## 🌎 Timezone Math & DST Safety

The engine handles cross-timezone bookings using the browser's native `Intl` API:

-   Converts operating slots to UTC timestamps using the host's base timezone.
-   Evaluates collisions and blocks on absolute timestamps.
-   Translates UTC timestamps back into the buyer's local time dynamically at runtime, accounting for Daylight Saving Time (DST) changes.

---

## 📦 Usage Example (Pure Logic)

```typescript
import { evaluateAvailability } from '@glatam/calendar-core';

const slots = [
  { start: '09:00', end: '10:00' },
  { start: '10:00', end: '11:00' }
];

const rules = [
  { id: '1', type: 'weekly', daysOfWeek: [0, 6], description: 'Closed Weekends' }
];

// Evaluate availability for a specific date
const availability = evaluateAvailability(new Date('2026-07-20'), slots, rules);
console.log(availability);
// Returns slots mapped with their availability status (blocked: false/true)
```
