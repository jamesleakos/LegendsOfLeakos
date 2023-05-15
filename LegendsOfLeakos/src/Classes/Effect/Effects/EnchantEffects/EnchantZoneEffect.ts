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
import LibraryEnchantment from '../../../Enchantment/LibraryEnchantment';
import RuntimeZone from '../../../Zone/RuntimeZone';

class EnchantZoneEffect extends GiveEnchantmentBaseEffect {
  // Enchantment Creation Static Vars

  // variables and methods to help with the creation of these effects by a person in the card creator
  override myRequiredEffectValues(): EffectValueCreatorInfo[] {
    let tempList: EffectValueCreatorInfo[] = [
      // not sure if I need anything here
    ];
    for (let x of super.myRequiredEffectValues()) {
      tempList.push(x);
    }
    return tempList;
  }

  override numberOfTargetTypes(): number {
    return 1;
  }

  override targetTypeInfoList(): TargetTypeInfo[] {
    let list: TargetTypeInfo[] = [];
    list.push(
      new TargetTypeInfo(
        'Targets To Be Enchanted', // name
        'These are the zones that are enchanted by this effect.', // description
        'Targets must be zones',
        1, // minMinSelectionsRequired
        null // maxMaxSelectionsRequired
      )
    );
    return list;
  }

  // Effect To Text

  effectToString(gameManager: GameManager): string {
    let outText: string =
      'Enchant zone with ' +
      gameManager.enchantmentLibrary[
        this.getEffectValue(
          EffectValueType.CreateEnchantmentEnchantmentLibraryID
        ).setValue
      ];
    return outText;
  }

  constructor(setEffectValues: EffectValue[], setTargetTypes: TargetType[]) {
    super();
    this.effectEnum = EffectType.EnchantZone;
    this.setEffectValueList(setEffectValues);
    this.setTargetTypeList(setTargetTypes);
  }

  override preEffect(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity,
    targetInfoList: TargetInfo[]
  ): boolean {
    let targetsToBeEnchanted: TargetInfo = targetInfoList[0];

    let enchantmentID: EffectValue = this.getEffectValue(
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
    targetInfoList: TargetInfo[]
  ): void {
    let zonesToEnchant: TargetInfo = targetInfoList[0];
    let zonesToEnchantTargetType: TargetType = this.targetTypes[0];
    if (
      !this.isTargetInfoStillValid(
        sourceEntity,
        state,
        zonesToEnchant,
        this.targetTypes[0]
      )
    )
      return;

    let enchantmentLibID: EffectValue = this.getEffectValue(
      EffectValueType.CreateEnchantmentEnchantmentLibraryID
    );

    for (let i = 0; i < zonesToEnchant.zoneInstanceIdList.length; i++) {
      let currentTargetZone: RuntimeZone = state.getZone(
        zonesToEnchant.zoneInstanceIdList[i]
      );
      if (!zonesToEnchantTargetType.zoneSatisfiesConditions(currentTargetZone))
        break;

      let creatingPlayer = sourceEntity.ownerPlayer;
      let libraryEnchantment: LibraryEnchantment =
        state.gameManager.getEnchantmentFromLibraryId(
          enchantmentLibID.modInts[i].effectiveValue
        );

      let runtimeEnchantment: RuntimeEnchantment = new RuntimeEnchantment(
        libraryEnchantment.libraryId, // this could also just be setValue probably
        state.gameManager.enchantmentLibrary,
        creatingPlayer.currentEntityInstanceId++,
        sourceEntity,
        sourceEntity.ownerPlayer,
        new Array<RuntimeKeyword>(),
        new Array<ActivatedAbility>(),
        currentTargetZone,
        null
      );

      // add keywords
      for (let keyword of libraryEnchantment.keywords) {
        let keywordCopy: RuntimeKeyword = RuntimeKeyword.createRuntimeKeyword(
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
        let abilityCopy: ActivatedAbility =
          ActivatedAbility.createActivatedAbility(
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

      currentTargetZone.enchantments.push(runtimeEnchantment);
    }
  }
}

export default EnchantZoneEffect;
