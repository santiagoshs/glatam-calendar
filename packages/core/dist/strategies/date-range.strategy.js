import { formatISODate, isTimeOverlapping } from '../utils/date-utils.js';
export class DateRangeStrategy {
    isDateBlocked(date, rule) {
        if (!this.matchesDateRange(date, rule)) {
            return false;
        }
        // If no slots are defined, the entire day is blocked.
        return !rule.slots || rule.slots.length === 0;
    }
    isSlotBlocked(date, slot, rule) {
        if (!this.matchesDateRange(date, rule)) {
            return false;
        }
        // If no slots are defined, the entire day is blocked, so the slot is blocked.
        if (!rule.slots || rule.slots.length === 0) {
            return true;
        }
        // Check if the slot overlaps with any blocked slots in the rule
        return rule.slots.some((blockedSlot) => isTimeOverlapping(slot, blockedSlot));
    }
    matchesDateRange(date, rule) {
        const dateStr = formatISODate(date);
        if (rule.startDate && dateStr < rule.startDate) {
            return false;
        }
        if (rule.endDate && dateStr > rule.endDate) {
            return false;
        }
        return true;
    }
}
//# sourceMappingURL=date-range.strategy.js.map