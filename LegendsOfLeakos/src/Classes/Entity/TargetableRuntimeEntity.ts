import Effect from '../Effect/Effect';
import GameState from '../Game/GameState';
import TargetInfo from '../Target/TargetInfo';
import RuntimeCard from '../Card/RuntimeCard';

/**
 * This class, which currently serves as the base for zones, cards, and enchantments, provides pre / post effect resolve
 * capacity for the effect solver. It incidentally is the base class for everything that an effect can target, though
 * currently that's not being used to full capacity.
 */
abstract class TargetableRuntimeEntity {
  public name: string;
  /**
   * The instance identifier of this card.
   */
  public instanceId: number;

  public abstract preResolveEffect(
    e: Effect,
    sourceCard: RuntimeCard,
    gameState: GameState,
    targetInfoList: TargetInfo[]
  ): void;

  public abstract postResolveEffect(
    e: Effect,
    sourceCard: RuntimeCard,
    gameState: GameState,
    targetInfoList: TargetInfo[]
  ): void;
}

export default TargetableRuntimeEntity;
