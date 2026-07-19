import { TimeSlot } from '../types.js';
/**
 * Parses an ISO date string (YYYY-MM-DD) into a local Date object.
 * Prevents timezone shifting issues.
 */
export declare function parseISODate(dateStr: string): Date;
/**
 * Formats a Date object to YYYY-MM-DD in the local timezone.
 */
export declare function formatISODate(date: Date): string;
/**
 * Converts a time string "HH:MM" to minutes from midnight.
 */
export declare function timeToMinutes(timeStr: string): number;
/**
 * Checks if two time slots overlap.
 */
export declare function isTimeOverlapping(slot1: TimeSlot, slot2: TimeSlot): boolean;
/**
 * Gets the start of the week for a given date.
 * @param date The date reference.
 * @param startOfWeekDay The day the week starts (0 = Sunday, 1 = Monday). Default is 0.
 */
export declare function getStartOfWeek(date: Date, startOfWeekDay?: number): Date;
//# sourceMappingURL=date-utils.d.ts.map