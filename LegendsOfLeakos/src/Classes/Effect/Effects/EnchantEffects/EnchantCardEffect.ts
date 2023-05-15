import GiveEnchantmentBaseEffect from "./GiveEnchantmentBaseEffect";

class EnchantCardEffect extends GiveEnchantmentBaseEffect {
  constructor(setEffectValues: Array<EffectValue>, setTargetTypes: Array<TargetType>) {
    super();
    this.effectEnum = EffectType.EnchantCard;
    this.SetEffectValueList(setEffectValues);
    this.SetTargetTypeList(setTargetTypes);
  }

  static MyRequiredEffectValues(): Array<EffectValueCreatorInfo> {
    let tempList: Array<EffectValueCreatorInfo> = [];
    for (let x of super.MyRequiredEffectValues()) {
      tempList.push(x);
    }
    return tempList;
  }

  static NumberOfTargetTypes(): number {
    return 1;
  }

  static TargetTypeInfoList(): Array<TargetTypeInfo> {
    let list: Array<TargetTypeInfo> = [];
    list.push(new TargetTypeInfo(
      "Targets To Be Enchanted", 
      "These are the units that are enchanted by this effect. At least one must remain in the targetableZoneIdList as of PreEffect to prevent sizzle", 
      "Targets must be cards",
      1,
      null
    ));
    return list;
  }

  EffectToString(): string {
    let outText = "Enchant card with " + 
                  GameManager.Instance.config.enchantments[this.GetEffectValue(EffectValueType.CreateEnchantmentEnchantmentLibraryID).setValue];
    return outText;
  }

  PreEffect(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: Array<TargetInfo>): boolean {
    const targetsToBeEnchanted = targetInfoList[0];

    const enchantmentID = this.GetEffectValue(EffectValueType.CreateEnchantmentEnchantmentLibraryID);

    enchantmentID.FitToTargetInfo(targetsToBeEnchanted);

    if (!this.IsTargetInfoStillValid(sourceEntity, state, targetsToBeEnchanted, this.targetTypes[0])) return false;

    for (let i = 0; i < enchantmentID.modInts.length; i++) {
      enchantmentID.modInts[i].baseValue = enchantmentID.setValue;
    }

    return true;
  }

  Resolve(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: Array<TargetInfo>): void {
    const cardsToEnchant = targetInfoList[0];
    const cardsToEnchantTargetType = this.targetTypes[0];
    if (!this.IsTargetInfoStillValid(sourceEntity, state, cardsToEnchant, this.targetTypes[0])) return;

    const enchantmentLibID = this.GetEffectValue(EffectValueType.CreateEnchantmentEnchantmentLibraryID);

    for (let i = 0; i < cardsToEnchant.cardInstanceIdList.length; i++) {
      const currentTargetCard = state.GetCardFromAnywhere(cardsToEnchant.cardInstanceIdList[i]);
      if (!cardsToEnchantTargetType.CardSatifiesConditions(currentTargetCard)) break;

      const creatingPlayer = sourceEntity.ownerPlayer;
      const libraryEnchantment = GameManager.Instance.config.GetEnchantmentFromLibraryId(enchantmentLibID.modInts[i].effectiveValue);
      
      const runtimeEnchantment = new RuntimeEnchantment(
        libraryEnchantment.libraryId, 
        creatingPlayer.currentEntityInstanceId++,
        sourceEntity,
        sourceEntity.ownerPlayer,
        [],
        [],
        currentTargetCard.residingZone,
        currentTargetCard
      );
      
      // add keywords
      for (let keyword of libraryEnchantment.keywords) {
        const keywordCopy = RuntimeKeywordFactory.CreateRuntimeKeyword(
          runtimeEnchantment.instanceId,
          keyword.keywordType,
          keyword.indexForUpgrades,
          keyword.designerDescription
          keyword.isPermanent,
          keyword.duration,
          keyword.GetKeywordValueList(),
          keyword.startsActive,
          keyword.conditions,
          keyword.imageName.value
        ).GetKeyword();
        keywordCopy.myEntity = runtimeEnchantment;
        runtimeEnchantment.runtimeKeywords.push(keywordCopy);
      }
      
      // add abilities
      for (let activatedAbility of libraryEnchantment.activatedAbilities) {
        const abilityCopy = AbilityFactory.CreateActivatedAbility(
          activatedAbility.indexForUpgrades,
          activatedAbility.name,
          EffectFactory.CreateEffect(
            activatedAbility.effect.effectEnum,
            activatedAbility.effect.effectValueList,
            activatedAbility.effect.targetTypes
          ).GetEffect(),
          activatedAbility.costs,
          activatedAbility.usesPerTurn,
          activatedAbility.usesRemaining,
          activatedAbility.usableInPhases,
          activatedAbility.isActive,
          activatedAbility.imageName.value
        );
        runtimeEnchantment.activatedAbilities.push(abilityCopy);
      }

      currentTargetCard.enchantments.push(runtimeEnchantment);
    }
  }
}

export default EnchantCardEffect;