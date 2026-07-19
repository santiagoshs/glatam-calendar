export interface TimeSlot {
  start: string;
  end: string;
}

export type BlockingRuleType = 'weekly' | 'date-range';

export interface BlockingRule {
  id: string;
  type: BlockingRuleType;
  startDate?: string;
  endDate?: string;
  daysOfWeek?: number[];
  slots?: TimeSlot[];
  description?: string; // Descriptive title/notes for the task/block
  [key: string]: any; // Allow custom metadata (assignees, status, priority)
}

export interface CalendarDay {
  dateString: string;
  date: Date;
  isBlocked: boolean;
  rule?: BlockingRule; // The rule blocking the whole day
  dayOfWeek: number;
  dayNumber: number;
  isCurrentMonth: boolean;
  slots: EvaluatedTimeSlot[];
}

export interface EvaluatedTimeSlot {
  start: string;
  end: string;
  isBlocked: boolean;
  rule?: BlockingRule; // The rule that caused the block
}
