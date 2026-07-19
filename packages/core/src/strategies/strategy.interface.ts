import { BlockingRule, TimeSlot } from '../types.js';

export interface BlockingStrategy {
  /**
   * Evaluates if a given date is blocked by the rule.
   * If the rule defines specific slots, a date is considered fully blocked
   * only if the whole day is covered, or we check slot-by-slot.
   * Here, isDateBlocked returns true if there is a day-wide block.
   */
  isDateBlocked(date: Date, rule: BlockingRule): boolean;

  /**
   * Evaluates if a specific time slot on a given date is blocked by this rule.
   */
  isSlotBlocked(date: Date, slot: TimeSlot, rule: BlockingRule): boolean;
}
