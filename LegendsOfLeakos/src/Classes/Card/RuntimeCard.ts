import AbilityKeywordRuntimeEntity from '../Entity/AbilityKeywordRuntimeEntity';
import Effect from '../Effect/Effect';
import Stat from '../Stat/Stat';
import BattlecryAbility from '../Ability/BattlecryAbility';
import RuntimeEnchantment from '../Enchantment/RuntimeEnchantment';
import TargetInfo from '../Target/TargetInfo';
import GameState from '../Game/GameState';

class RuntimeCard extends AbilityKeywordRuntimeEntity {
  libraryId: number;
  upgradesApplied: number[] = [];
  attack: Stat;
  health: Stat;
  priority: Stat;
  getStatList = (): Stat[] => [this.attack, this.health, this.priority];
  battlecryAbilities: BattlecryAbility[] = [];
  enchantments: RuntimeEnchantment[] = [];

  amBlocking: boolean;
  serverBlockOrder: number;

  preResolveEffect(
    e: Effect,
    sourceCard: RuntimeCard,
    gameState: GameState,
    targetInfoList: TargetInfo[]
  ): void {
    for (const enchantment of this.enchantments) {
      enchantment.preResolveEffect(e, sourceCard, gameState, targetInfoList);
    }

    super.preResolveEffect(e, sourceCard, gameState, targetInfoList);
  }

  postResolveEffect(
    e: Effect,
    sourceCard: RuntimeCard,
    gameState: GameState,
    targetInfoList: TargetInfo[]
  ): void {
    for (const enchantment of this.enchantments) {
      enchantment.postResolveEffect(e, sourceCard, gameState, targetInfoList);
    }

    super.postResolveEffect(e, sourceCard, gameState, targetInfoList);
  }
}

export default RuntimeCard;
