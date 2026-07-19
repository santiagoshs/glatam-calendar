import { BlockingRule, CalendarDay, TimeSlot, EvaluatedTimeSlot } from './types.js';
import { BlockingStrategyFactory } from './strategies/factory.js';
import { formatISODate, getStartOfWeek } from './utils/date-utils.js';

export * from './types.js';
export * from './utils/date-utils.js';
export * from './strategies/strategy.interface.js';
export * from './strategies/weekly.strategy.js';
export * from './strategies/date-range.strategy.js';
export * from './strategies/factory.js';

/**
 * Checks if a specific date or time slot is blocked and returns the matching rule.
 */
export function getBlockingRule(date: Date, slot: TimeSlot | undefined, rules: BlockingRule[]): BlockingRule | undefined {
  for (const rule of rules) {
    const strategy = BlockingStrategyFactory.getStrategy(rule.type);
    if (slot) {
      if (strategy.isSlotBlocked(date, slot, rule)) return rule;
    } else {
      if (strategy.isDateBlocked(date, rule)) return rule;
    }
  }
  return undefined;
}

export function isTimeBlocked(date: Date, slot: TimeSlot | undefined, rules: BlockingRule[]): boolean {
  return !!getBlockingRule(date, slot, rules);
}

/**
 * Generates an array of CalendarDay items representing a monthly calendar grid.
 */
export function generateMonthDays(
  year: number,
  month: number,
  rules: BlockingRule[],
  slotsPerDay: TimeSlot[] = [],
  startOfWeekDay = 0
): CalendarDay[] {
  const firstDayOfMonth = new Date(year, month, 1);
  const startGridDate = getStartOfWeek(firstDayOfMonth, startOfWeekDay);

  const days: CalendarDay[] = [];
  const currentDate = new Date(startGridDate);

  for (let i = 0; i < 42; i++) {
    const dateCopy = new Date(currentDate);
    const dateString = formatISODate(dateCopy);

    const evaluatedSlots: EvaluatedTimeSlot[] = slotsPerDay.map((slot) => {
      const match = getBlockingRule(dateCopy, slot, rules);
      return { ...slot, isBlocked: !!match, rule: match };
    });

    const dayRule = getBlockingRule(dateCopy, undefined, rules);
    const isDayFullyBlocked = !!dayRule || (evaluatedSlots.length > 0 && evaluatedSlots.every((s) => s.isBlocked));

    days.push({
      dateString,
      date: dateCopy,
      isBlocked: isDayFullyBlocked,
      rule: dayRule || (evaluatedSlots.length > 0 && evaluatedSlots.every((s) => s.isBlocked) ? evaluatedSlots[0].rule : undefined),
      dayOfWeek: dateCopy.getDay(),
      dayNumber: dateCopy.getDate(),
      isCurrentMonth: dateCopy.getMonth() === month,
      slots: evaluatedSlots,
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return days;
}

/**
 * Generates an array of 7 CalendarDay items representing a single week view.
 */
export function generateWeekDays(
  referenceDate: Date,
  rules: BlockingRule[],
  slotsPerDay: TimeSlot[] = [],
  startOfWeekDay = 0
): CalendarDay[] {
  const startOfWeek = getStartOfWeek(referenceDate, startOfWeekDay);
  const days: CalendarDay[] = [];
  const currentDate = new Date(startOfWeek);

  for (let i = 0; i < 7; i++) {
    const dateCopy = new Date(currentDate);
    const dateString = formatISODate(dateCopy);

    const evaluatedSlots: EvaluatedTimeSlot[] = slotsPerDay.map((slot) => {
      const match = getBlockingRule(dateCopy, slot, rules);
      return { ...slot, isBlocked: !!match, rule: match };
    });

    const dayRule = getBlockingRule(dateCopy, undefined, rules);
    const isDayFullyBlocked = !!dayRule || (evaluatedSlots.length > 0 && evaluatedSlots.every((s) => s.isBlocked));

    days.push({
      dateString,
      date: dateCopy,
      isBlocked: isDayFullyBlocked,
      rule: dayRule || (evaluatedSlots.length > 0 && evaluatedSlots.every((s) => s.isBlocked) ? evaluatedSlots[0].rule : undefined),
      dayOfWeek: dateCopy.getDay(),
      dayNumber: dateCopy.getDate(),
      isCurrentMonth: true,
      slots: evaluatedSlots,
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return days;
}
