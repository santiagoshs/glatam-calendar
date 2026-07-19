import { TimeSlot } from '@glatam/calendar-core';

/**
 * Calculates the difference in minutes between two timezones on a specific date.
 * 'local' represents the user's local timezone.
 */
export declare function getTimezoneOffsetDiff(date: Date, fromTz: string, toTz: string): number;
/**
 * Shifts a single TimeSlot's times by a given offset in minutes and returns the shifted slot and optional day offset.
 */
export declare function shiftSlot(slot: TimeSlot, offsetMinutes: number): {
    start: string;
    end: string;
    dayShift: number;
};
//# sourceMappingURL=timezone-utils.d.ts.map