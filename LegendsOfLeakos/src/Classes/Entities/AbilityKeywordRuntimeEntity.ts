import TargetableRuntimeEntity from './TargetableRuntimeEntity';
import RuntimeZone from '../Zones/RuntimeZone';
import RuntimeCard from '../Cards/RuntimeCard';

/**
 * This class extends TargetableRuntimeEntity and provides abilities and keywords to that class. It is currently used by
 * cards and enchantments.
 */
class AbilityKeywordRuntimeEntity extends TargetableRuntimeEntity {
  // this always lives in a zone
  public residingZone: RuntimeZone;

  /**
   * for a card, this is the player that put it in their deck. For an enchantment, its the player that created it
   */
  public ownerPlayer: PlayerInfo;

  public runtimeKeywords: RuntimeKeyword[] = [];
  public activatedAbilities: ActivatedAbility[] = [];

  /**
   * The callback that is called when a keyword is added to this card.
   */
  public onKeywordAdded?: (k: RuntimeKeyword) => void;

  /**
   * The callback that is called when a keyword is removed from this card.
   */
  public onKeywordRemoved?: (k: RuntimeKeyword) => void;

  public keywordsToRemove: RuntimeKeyword[] = [];

  // Keywords Functions

  /**
   * Adds a keyword to this card.
   */
  public addKeyword(
    keywordType: KeywordType,
    indexForUpgrades: number | null,
    description: string,
    isPermanent: boolean,
    duration: number,
    valueList: KeywordValue[],
    isActive: boolean,
    conditions: Condition[],
    imageName: string
  ): void {
    const k = RuntimeKeywordFactory.createRuntimeKeyword(
      this.instanceId,
      keywordType,
      indexForUpgrades,
      description,
      isPermanent,
      duration,
      valueList,
      isActive,
      conditions,
      imageName
    ).getKeyword();
    k.myEntity = this;
    this.runtimeKeywords.push(k);
    if (this.onKeywordAdded) {
      this.onKeywordAdded(k);
    }
  }

  public condemnKeywordToRemoval(k: RuntimeKeyword): void {
    this.keywordsToRemove.push(k);
  }

  public clearKeywordsToRemove(): void {
    for (const k of this.keywordsToRemove) {
      this.removeKeyword(k);
    }

    this.keywordsToRemove = [];
  }

  public removeKeyword(keyword: RuntimeKeyword): void {
    const index = this.runtimeKeywords.indexOf(keyword);
    if (index > -1) {
      this.runtimeKeywords.splice(index, 1);
    }
    if (this.onKeywordRemoved) {
      this.onKeywordRemoved(keyword);
    }
  }

  public hasKeyword(keywordType: KeywordType): boolean {
    const k = this.runtimeKeywords.find((x) => x.keywordType === keywordType);
    return k !== undefined;
  }

  // Functions for Effect / Keyword Interactions

  // END TURN
  public onEndTurn(): void {
    for (const activatedAbility of this.activatedAbilities) {
      if (!activatedAbility.isActive) continue;
      activatedAbility.onEndTurn();
    }
    for (const k of this.runtimeKeywords) {
      if (!k.isActive) continue;
      k.onEndTurn();
    }
  }

  // CARD EFFECT
  public preResolveEffect(
    e: Effect,
    sourceCard: RuntimeCard,
    gameState: GameState,
    targetInfoList: TargetInfo[]
  ): void {
    for (const keyword of this.runtimeKeywords) {
      if (!keyword.isActive) continue;
      keyword.preResolveEffect(this, e, sourceCard, gameState, targetInfoList);
    }

    this.clearKeywordsToRemove();
  }

  public postResolveEffect(
    e: Effect,
    sourceCard: RuntimeCard,
    gameState: GameState,
    targetInfoList: TargetInfo[]
  ): void {
    for (const keyword of this.runtimeKeywords) {
      if (!keyword.isActive) continue;
      keyword.postResolveEffect(this, e, sourceCard, gameState, targetInfoList);
    }
    this.clearKeywordsToRemove();
  }

  // endregion
}

export default AbilityKeywordRuntimeEntity;
