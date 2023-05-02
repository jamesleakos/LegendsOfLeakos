import { Condition } from './Condition';
import RuntimeCard from '../Cards/RuntimeCard';

abstract class CardCondition extends Condition {
  /**
   * Returns true if this condition has been met on the specified card and false otherwise.
   * @param card The card.
   * @returns True if this condition has been met on the specified card; false otherwise.
   */
  public abstract isTrue(card: RuntimeCard): boolean;
}
