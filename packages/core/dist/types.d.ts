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
    description?: string;
    [key: string]: any;
}
export interface CalendarDay {
    dateString: string;
    date: Date;
    isBlocked: boolean;
    rule?: BlockingRule;
    dayOfWeek: number;
    dayNumber: number;
    isCurrentMonth: boolean;
    slots: EvaluatedTimeSlot[];
}
export interface EvaluatedTimeSlot {
    start: string;
    end: string;
    isBlocked: boolean;
    rule?: BlockingRule;
}
//# sourceMappingURL=types.d.ts.map