import AbilityKeywordRuntimeEntity from '../Entity/AbilityKeywordRuntimeEntity';
import Effect from '../Effect/Effect';
import Stat from '../Stat/Stat';
import BattlecryAbility from '../Ability/BattlecryAbility';
import RuntimeEnchantment from '../Enchantment/RuntimeEnchantment';
import TargetInfo from '../Target/TargetInfo';
import GameState from '../Game/GameState';
declare class RuntimeCard extends AbilityKeywordRuntimeEntity {
    libraryId: number;
    upgradesApplied: number[];
    attack: Stat;
    health: Stat;
    priority: Stat;
    battlecryAbilities: BattlecryAbility[];
    enchantments: RuntimeEnchantment[];
    amBlocking: boolean;
    serverBlockOrder: number;
    preResolveEffect(e: Effect, sourceCard: RuntimeCard, gameState: GameState, targetInfoList: TargetInfo[]): void;
    postResolveEffect(e: Effect, sourceCard: RuntimeCard, gameState: GameState, targetInfoList: TargetInfo[]): void;
}
export default RuntimeCard;
