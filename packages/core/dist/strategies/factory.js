import { WeeklyStrategy } from './weekly.strategy.js';
import { DateRangeStrategy } from './date-range.strategy.js';
export class BlockingStrategyFactory {
    static { this.strategies = {
        weekly: new WeeklyStrategy(),
        'date-range': new DateRangeStrategy(),
    }; }
    /**
     * Retrieves the strategy for a given rule type.
     */
    static getStrategy(type) {
        const strategy = this.strategies[type];
        if (!strategy) {
            throw new Error(`Estrategia de bloqueo no soportada: ${type}`);
        }
        return strategy;
    }
}
//# sourceMappingURL=factory.js.map