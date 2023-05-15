import ActivatedAbility from '../../../Ability/ActivatedAbility';
import RuntimeEnchantment from '../../../Enchantment/RuntimeEnchantment';
import RuntimeKeyword from '../../../Keyword/RuntimeKeyword';
import Effect from '../../Effect';
import GiveEnchantmentBaseEffect from './GiveEnchantmentBaseEffect';
import EffectValue from '../../EffectValue';
import { EffectType, EffectValueType } from '../../../../Enums/Effect';
import TargetInfo from '../../../Target/TargetInfo';
import GameState from '../../../Game/GameState';
import TargetType from '../../../Target/TargetType';
import TargetTypeInfo from '../../../Target/TargetTypeInfo';
import EffectValueCreatorInfo from '../../EffectValueCreatorInfo';
import AbilityKeywordRuntimeEntity from '../../../Entity/AbilityKeywordRuntimeEntity';
import GameManager from '../../../Game/GameManager';

class EnchantCardEffect extends GiveEnchantmentBaseEffect {
  constructor(
    setEffectValues: Array<EffectValue>,
    setTargetTypes: Array<TargetType>
  ) {
    super();
    this.effectEnum = EffectType.EnchantCard;
    this.setEffectValueList(setEffectValues);
    this.setTargetTypeList(setTargetTypes);
  }

  override myRequiredEffectValues(): Array<EffectValueCreatorInfo> {
    let tempList: Array<EffectValueCreatorInfo> = [];
    for (let x of super.myRequiredEffectValues()) {
      tempList.push(x);
    }
    return tempList;
  }

  override numberOfTargetTypes(): number {
    return 1;
  }

  override targetTypeInfoList(): Array<TargetTypeInfo> {
    let list: Array<TargetTypeInfo> = [];
    list.push(
      new TargetTypeInfo(
        'Targets To Be Enchanted',
        'These are the units that are enchanted by this effect. At least one must remain in the targetableZoneIdList as of PreEffect to prevent sizzle',
        'Targets must be cards',
        1,
        null
      )
    );
    return list;
  }

  override effectToString(gameManager: GameManager): string {
    let outText =
      'Enchant card with ' +
      gameManager.enchantmentLibrary[
        this.getEffectValue(
          EffectValueType.CreateEnchantmentEnchantmentLibraryID
        ).setValue
      ];
    return outText;
  }

  override preEffect(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity,
    targetInfoList: Array<TargetInfo>
  ): boolean {
    const targetsToBeEnchanted = targetInfoList[0];

    const enchantmentID = this.getEffectValue(
      EffectValueType.CreateEnchantmentEnchantmentLibraryID
    );

    enchantmentID.fitToTargetInfo(targetsToBeEnchanted);

    if (
      !this.isTargetInfoStillValid(
        sourceEntity,
        state,
        targetsToBeEnchanted,
        this.targetTypes[0]
      )
    )
      return false;

    for (let i = 0; i < enchantmentID.modInts.length; i++) {
      enchantmentID.modInts[i].baseValue = enchantmentID.setValue;
    }

    return true;
  }

  override resolve(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity,
    targetInfoList: Array<TargetInfo>
  ): void {
    const cardsToEnchant = targetInfoList[0];
    const cardsToEnchantTargetType = this.targetTypes[0];
    if (
      !this.isTargetInfoStillValid(
        sourceEntity,
        state,
        cardsToEnchant,
        this.targetTypes[0]
      )
    )
      return;

    const enchantmentLibID = this.getEffectValue(
      EffectValueType.CreateEnchantmentEnchantmentLibraryID
    );

    for (let i = 0; i < cardsToEnchant.cardInstanceIdList.length; i++) {
      const currentTargetCard = state.getCardFromAnywhere(
        cardsToEnchant.cardInstanceIdList[i]
      );
      if (!cardsToEnchantTargetType.cardSatisfiesConditions(currentTargetCard))
        break;

      const creatingPlayer = sourceEntity.ownerPlayer;
      const libraryEnchantment = state.gameManager.getEnchantmentFromLibraryId(
        enchantmentLibID.modInts[i].effectiveValue
      );

      const runtimeEnchantment = new RuntimeEnchantment(
        libraryEnchantment.libraryId,
        state.gameManager.enchantmentLibrary,
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
        const keywordCopy = RuntimeKeyword.createRuntimeKeyword(
          runtimeEnchantment.instanceId,
          keyword.keywordType,
          keyword.indexForUpgrades,
          keyword.designerDescription,
          keyword.isPermanent,
          keyword.duration,
          keyword.getKeywordValueList(),
          keyword.startsActive,
          keyword.conditions,
          keyword.imageName
        ).keyword;
        keywordCopy.myEntity = runtimeEnchantment;
        runtimeEnchantment.runtimeKeywords.push(keywordCopy);
      }

      // add abilities
      for (let activatedAbility of libraryEnchantment.activatedAbilities) {
        const abilityCopy = ActivatedAbility.createActivatedAbility(
          activatedAbility.indexForUpgrades,
          activatedAbility.name,
          Effect.createEffect(
            activatedAbility.effect.effectEnum,
            activatedAbility.effect.effectValueList,
            activatedAbility.effect.targetTypes
          ).effect,
          activatedAbility.costs,
          activatedAbility.usesPerTurn,
          activatedAbility.usesRemaining,
          activatedAbility.usableInPhases,
          activatedAbility.isActive,
          activatedAbility.imageName
        );
        runtimeEnchantment.activatedAbilities.push(abilityCopy);
      }

      currentTargetCard.enchantments.push(runtimeEnchantment);
    }
  }
}

export default EnchantCardEffect;
