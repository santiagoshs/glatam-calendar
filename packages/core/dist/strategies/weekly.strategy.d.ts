import { BlockingRule, TimeSlot } from '../types.js';
import { BlockingStrategy } from './strategy.interface.js';
export declare class WeeklyStrategy implements BlockingStrategy {
    isDateBlocked(date: Date, rule: BlockingRule): boolean;
    isSlotBlocked(date: Date, slot: TimeSlot, rule: BlockingRule): boolean;
    private matchesDateAndDay;
}
//# sourceMappingURL=weekly.strategy.d.ts.map