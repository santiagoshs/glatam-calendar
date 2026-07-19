import { BlockingRuleType } from '../types.js';
import { BlockingStrategy } from './strategy.interface.js';
export declare class BlockingStrategyFactory {
    private static strategies;
    /**
     * Retrieves the strategy for a given rule type.
     */
    static getStrategy(type: BlockingRuleType): BlockingStrategy;
}
//# sourceMappingURL=factory.d.ts.map