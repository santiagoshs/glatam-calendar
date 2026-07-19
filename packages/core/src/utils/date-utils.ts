import { TimeSlot } from '../types.js';

/**
 * Parses an ISO date string (YYYY-MM-DD) into a local Date object.
 * Prevents timezone shifting issues.
 */
export function parseISODate(dateStr: string): Date {
  const parts = dateStr.split('T')[0].split('-');
  if (parts.length !== 3) {
    return new Date(dateStr);
  }
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // 0-indexed
  const day = parseInt(parts[2], 10);
  return new Date(year, month, day);
}

/**
 * Formats a Date object to YYYY-MM-DD in the local timezone.
 */
export function formatISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Converts a time string "HH:MM" to minutes from midnight.
 */
export function timeToMinutes(timeStr: string): number {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return (hours || 0) * 60 + (minutes || 0);
}

/**
 * Checks if two time slots overlap.
 */
export function isTimeOverlapping(slot1: TimeSlot, slot2: TimeSlot): boolean {
  const start1 = timeToMinutes(slot1.start);
  const end1 = timeToMinutes(slot1.end);
  const start2 = timeToMinutes(slot2.start);
  const end2 = timeToMinutes(slot2.end);

  return start1 < end2 && start2 < end1;
}

/**
 * Gets the start of the week for a given date.
 * @param date The date reference.
 * @param startOfWeekDay The day the week starts (0 = Sunday, 1 = Monday). Default is 0.
 */
export function getStartOfWeek(date: Date, startOfWeekDay = 0): Date {
  const result = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = result.getDay();
  const diff = (day < startOfWeekDay ? 7 : 0) + day - startOfWeekDay;
  result.setDate(result.getDate() - diff);
  return result;
}
