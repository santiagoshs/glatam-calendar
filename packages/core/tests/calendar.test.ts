import { describe, it, expect } from 'vitest';
import {
  isTimeBlocked,
  generateMonthDays,
  generateWeekDays,
  parseISODate,
  formatISODate,
  BlockingRule,
  TimeSlot,
} from '../src/index.js';

describe('Calendar Core tests', () => {
  describe('Date Utilities', () => {
    it('should parse YYYY-MM-DD to local Date object timezone-neutrally', () => {
      const parsed = parseISODate('2026-07-18');
      expect(parsed.getFullYear()).toBe(2026);
      expect(parsed.getMonth()).toBe(6); // July is 6
      expect(parsed.getDate()).toBe(18);
    });

    it('should format Date object to YYYY-MM-DD string', () => {
      const date = new Date(2026, 6, 18);
      expect(formatISODate(date)).toBe('2026-07-18');
    });
  });

  describe('isTimeBlocked with WeeklyStrategy', () => {
    const rules: BlockingRule[] = [
      {
        id: '1',
        type: 'weekly',
        daysOfWeek: [1, 3], // Monday and Wednesday
        slots: [
          { start: '09:00', end: '11:00' },
          { start: '14:00', end: '16:00' },
        ],
      },
    ];

    it('should block matching slots on Monday', () => {
      const monday = new Date(2026, 6, 13); // Monday
      const slot: TimeSlot = { start: '09:30', end: '10:30' };
      expect(isTimeBlocked(monday, slot, rules)).toBe(true);
    });

    it('should NOT block non-matching slots on Monday', () => {
      const monday = new Date(2026, 6, 13); // Monday
      const slot: TimeSlot = { start: '11:30', end: '13:00' };
      expect(isTimeBlocked(monday, slot, rules)).toBe(false);
    });

    it('should NOT block any slots on Tuesday', () => {
      const tuesday = new Date(2026, 6, 14); // Tuesday
      const slot: TimeSlot = { start: '09:30', end: '10:30' };
      expect(isTimeBlocked(tuesday, slot, rules)).toBe(false);
    });
  });

  describe('isTimeBlocked with DateRangeStrategy', () => {
    const rules: BlockingRule[] = [
      {
        id: '2',
        type: 'date-range',
        startDate: '2026-07-20',
        endDate: '2026-07-25',
        // No slots means block the entire day
      },
    ];

    it('should block any time on dates within range', () => {
      const testDate = new Date(2026, 6, 22); // July 22, 2026
      expect(isTimeBlocked(testDate, undefined, rules)).toBe(true);
    });

    it('should NOT block dates outside range', () => {
      const testDate = new Date(2026, 6, 26); // July 26, 2026
      expect(isTimeBlocked(testDate, undefined, rules)).toBe(false);
    });
  });

  describe('Grid Generation', () => {
    it('should generate 42 days for month view grid', () => {
      const rules: BlockingRule[] = [];
      const days = generateMonthDays(2026, 6, rules); // July 2026
      expect(days.length).toBe(42);
      // July 1st, 2026 is a Wednesday.
      // If startOfWeekDay is 0 (Sunday), the first day of grid should be June 28th.
      expect(days[0].dateString).toBe('2026-06-28');
    });

    it('should generate 7 days for week view grid', () => {
      const rules: BlockingRule[] = [];
      const days = generateWeekDays(new Date(2026, 6, 18), rules, [], 1); // July 18, 2026 (Saturday), start Monday
      expect(days.length).toBe(7);
      // Mon of that week is July 13th
      expect(days[0].dateString).toBe('2026-07-13');
      expect(days[6].dateString).toBe('2026-07-19');
    });
  });
});
