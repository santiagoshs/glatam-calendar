import { BlockingRule, TimeSlot } from '../types.js';
import { BlockingStrategy } from './strategy.interface.js';
import { formatISODate, isTimeOverlapping } from '../utils/date-utils.js';

export class DateRangeStrategy implements BlockingStrategy {
  isDateBlocked(date: Date, rule: BlockingRule): boolean {
    if (!this.matchesDateRange(date, rule)) {
      return false;
    }
    // If no slots are defined, the entire day is blocked.
    return !rule.slots || rule.slots.length === 0;
  }

  isSlotBlocked(date: Date, slot: TimeSlot, rule: BlockingRule): boolean {
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

  private matchesDateRange(date: Date, rule: BlockingRule): boolean {
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
