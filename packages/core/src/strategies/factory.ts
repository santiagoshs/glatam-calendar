import { BlockingRuleType } from '../types.js';
import { BlockingStrategy } from './strategy.interface.js';
import { WeeklyStrategy } from './weekly.strategy.js';
import { DateRangeStrategy } from './date-range.strategy.js';

export class BlockingStrategyFactory {
  private static strategies: Record<BlockingRuleType, BlockingStrategy> = {
    weekly: new WeeklyStrategy(),
    'date-range': new DateRangeStrategy(),
  };

  /**
   * Retrieves the strategy for a given rule type.
   */
  static getStrategy(type: BlockingRuleType): BlockingStrategy {
    const strategy = this.strategies[type];
    if (!strategy) {
      throw new Error(`Estrategia de bloqueo no soportada: ${type}`);
    }
    return strategy;
  }
}
