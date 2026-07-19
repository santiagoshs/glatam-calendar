import { BlockingRule, CalendarDay, TimeSlot } from './types.js';
export * from './types.js';
export * from './utils/date-utils.js';
export * from './strategies/strategy.interface.js';
export * from './strategies/weekly.strategy.js';
export * from './strategies/date-range.strategy.js';
export * from './strategies/factory.js';
/**
 * Checks if a specific date or time slot is blocked and returns the matching rule.
 */
export declare function getBlockingRule(date: Date, slot: TimeSlot | undefined, rules: BlockingRule[]): BlockingRule | undefined;
export declare function isTimeBlocked(date: Date, slot: TimeSlot | undefined, rules: BlockingRule[]): boolean;
/**
 * Generates an array of CalendarDay items representing a monthly calendar grid.
 */
export declare function generateMonthDays(year: number, month: number, rules: BlockingRule[], slotsPerDay?: TimeSlot[], startOfWeekDay?: number): CalendarDay[];
/**
 * Generates an array of 7 CalendarDay items representing a single week view.
 */
export declare function generateWeekDays(referenceDate: Date, rules: BlockingRule[], slotsPerDay?: TimeSlot[], startOfWeekDay?: number): CalendarDay[];
//# sourceMappingURL=index.d.ts.map