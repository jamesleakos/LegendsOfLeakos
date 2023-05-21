import TargetableRuntimeEntity from './TargetableRuntimeEntity';
import RuntimeZone from '../Zone/RuntimeZone';
import RuntimeCard from '../Card/RuntimeCard';
import RuntimeKeyword from '../Keyword/RuntimeKeyword';
import ActivatedAbility from '../Ability/ActivatedAbility';
import PlayerInfo from '../Player/PlayerInfo';
import { KeywordType } from '../../Enums/Keyword';
import KeywordValue from '../Keyword/KeywordValue';
import { Condition } from '../Condition/Condition';
import Effect from '../Effect/Effect';
import GameState from '../Game/GameState';
import TargetInfo from '../Target/TargetInfo';
/**
 * This class extends TargetableRuntimeEntity and provides abilities and keywords to that class. It is currently used by
 * cards and enchantments.
 */
declare class AbilityKeywordRuntimeEntity extends TargetableRuntimeEntity {
    residingZone: RuntimeZone;
    /**
     * for a card, this is the player that put it in their deck. For an enchantment, its the player that created it
     */
    ownerPlayer: PlayerInfo;
    runtimeKeywords: RuntimeKeyword[];
    activatedAbilities: ActivatedAbility[];
    /**
     * The callback that is called when a keyword is added to this card.
     */
    onKeywordAdded?: (k: RuntimeKeyword) => void;
    /**
     * The callback that is called when a keyword is removed from this card.
     */
    onKeywordRemoved?: (k: RuntimeKeyword) => void;
    keywordsToRemove: RuntimeKeyword[];
    /**
     * Adds a keyword to this card.
     */
    addKeyword(keywordType: KeywordType, indexForUpgrades: number | null, description: string, isPermanent: boolean, duration: number, valueList: KeywordValue[], isActive: boolean, conditions: Condition[], imageName: string): void;
    condemnKeywordToRemoval(k: RuntimeKeyword): void;
    clearKeywordsToRemove(): void;
    removeKeyword(keyword: RuntimeKeyword): void;
    hasKeyword(keywordType: KeywordType): boolean;
    onEndTurn(): void;
    preResolveEffect(e: Effect, sourceCard: RuntimeCard, gameState: GameState, targetInfoList: TargetInfo[]): void;
    postResolveEffect(e: Effect, sourceCard: RuntimeCard, gameState: GameState, targetInfoList: TargetInfo[]): void;
}
export default AbilityKeywordRuntimeEntity;
