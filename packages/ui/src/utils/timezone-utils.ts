import { TimeSlot } from '@glatam/calendar-core';

/**
 * Calculates the difference in minutes between two timezones on a specific date.
 * 'local' represents the user's local timezone.
 */
export function getTimezoneOffsetDiff(date: Date, fromTz: string, toTz: string): number {
  if (fromTz === toTz) return 0;

  const getTzDate = (d: Date, tz: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric',
      hour12: false,
    };
    if (tz !== 'local') {
      options.timeZone = tz;
    }
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const parts = formatter.formatToParts(d);
    const map = new Map(parts.map(p => [p.type, p.value]));
    
    const hourVal = Number(map.get('hour'));
    const hour = hourVal === 24 ? 0 : hourVal;

    return new Date(
      Number(map.get('year')),
      Number(map.get('month')) - 1,
      Number(map.get('day')),
      hour,
      Number(map.get('minute')),
      Number(map.get('second'))
    );
  };

  try {
    const d1 = getTzDate(date, fromTz);
    const d2 = getTzDate(date, toTz);
    return (d2.getTime() - d1.getTime()) / (60 * 1000);
  } catch (e) {
    // Fallback if timezone name is invalid
    return 0;
  }
}

/**
 * Shifts a single TimeSlot's times by a given offset in minutes and returns the shifted slot and optional day offset.
 */
export function shiftSlot(slot: TimeSlot, offsetMinutes: number): { start: string; end: string; dayShift: number } {
  if (offsetMinutes === 0) {
    return { start: slot.start, end: slot.end, dayShift: 0 };
  }

  const parseToMinutes = (timeStr: string) => {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  };

  const formatFromMinutes = (totalMinutes: number) => {
    // Normalize minutes to [0, 1439]
    let normalized = totalMinutes % 1440;
    if (normalized < 0) normalized += 1440;
    const h = String(Math.floor(normalized / 60)).padStart(2, '0');
    const m = String(normalized % 60).padStart(2, '0');
    return `${h}:${m}`;
  };

  const startMin = parseToMinutes(slot.start);
  const endMin = parseToMinutes(slot.end);

  const shiftedStart = startMin + offsetMinutes;
  const shiftedEnd = endMin + offsetMinutes;

  // Determine if we crossed midnight (day shift)
  let dayShift = 0;
  if (shiftedStart < 0) {
    dayShift = -1;
  } else if (shiftedStart >= 1440) {
    dayShift = 1;
  }

  return {
    start: formatFromMinutes(shiftedStart),
    end: formatFromMinutes(shiftedEnd),
    dayShift
  };
}
