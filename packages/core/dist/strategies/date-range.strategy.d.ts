import { BlockingRule, TimeSlot } from '../types.js';
import { BlockingStrategy } from './strategy.interface.js';
export declare class DateRangeStrategy implements BlockingStrategy {
    isDateBlocked(date: Date, rule: BlockingRule): boolean;
    isSlotBlocked(date: Date, slot: TimeSlot, rule: BlockingRule): boolean;
    private matchesDateRange;
}
//# sourceMappingURL=date-range.strategy.d.ts.map