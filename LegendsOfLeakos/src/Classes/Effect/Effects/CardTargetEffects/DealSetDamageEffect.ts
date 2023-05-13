import EntityEffect from '../../EntityEffect';
import EffectValueCreatorInfo from '../../EffectValueCreatorInfo';
import EffectValue from '../../EffectValue';
import { EffectType, EffectValueType } from '../../../../Enums/Effect';
import TargetInfo from '../../../Target/TargetInfo';
import AbilityKeywordRuntimeEntity from '../../../Entity/AbilityKeywordRuntimeEntity';
import GameState from '../../../Game/GameState';
import TargetType from '../../../Target/TargetType';
import RuntimeCard from '../../../Card/RuntimeCard';
import TargetTypeInfo from '../../../Target/TargetTypeInfo';

class DealSetDamageEffect extends EntityEffect {
  // Effect Creation Static Vars

  // variables and methods to help with the creation of these effects by a person in the card creator
  override myRequiredEffectValues(): Array<EffectValueCreatorInfo> {
    let tempList: Array<EffectValueCreatorInfo> = [
      new EffectValueCreatorInfo(EffectValueType.DamageAmount, true),
      new EffectValueCreatorInfo(EffectValueType.HitDivineShield, false),
    ];
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
        'Targets To Be Dealt Damage', // name
        'These are the targets that are damaged. They are damaged a set amount.', // description
        'Targets must be cards', // target type description
        1, // minMinSelectionsRequired
        null // maxMaxSelectionsRequired
      )
    );
    return list;
  }

  // Effect To Text

  override effectToString(): string {
    let outText =
      'Deal ' +
      this.getEffectValue(EffectValueType.DamageAmount).setValue.toString() +
      ' damage to up to ' +
      this.targetTypes[0].maxSelectionsAllowed.toString() +
      ' targets.';
    return outText;
  }

  // constructor
  constructor(
    setEffectValues: Array<EffectValue>,
    setTargetTypes: Array<TargetType>
  ) {
    super();
    this.effectEnum = EffectType.DealSetDamage;
    this.setEffectValueList(setEffectValues);
    this.setTargetTypeList(setTargetTypes);
  }

  changeEffectDamageAmount(
    newAmount: number,
    index: number,
    modifyPermanent: boolean
  ) {
    this.modifyEffectValueInt(
      EffectValueType.DamageAmount,
      index,
      newAmount,
      modifyPermanent
    );
  }

  override preEffect(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity,
    targetInfoList: Array<TargetInfo>
  ): boolean {
    let targetsToBeDealtDamage: TargetInfo = targetInfoList[0];

    let damageAmountEV: EffectValue = this.getEffectValue(
      EffectValueType.DamageAmount
    );
    let hitDivineShieldEV: EffectValue = this.getEffectValue(
      EffectValueType.HitDivineShield
    );

    damageAmountEV.fitToTargetInfo(targetsToBeDealtDamage);
    hitDivineShieldEV.fitToTargetInfo(targetsToBeDealtDamage);

    if (
      !this.isTargetInfoStillValid(
        sourceEntity,
        state,
        targetsToBeDealtDamage,
        this.targetTypes[0]
      )
    )
      return false;
    if (!this.isCardStillInPlay(sourceEntity)) return false;

    return true;
  }

  override resolve(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity,
    targetInfoList: Array<TargetInfo>
  ) {
    let targetsToBeDealtDamage: TargetInfo = targetInfoList[0];
    let damageTargetType: TargetType = this.targetTypes[0];

    for (let i = 0; i < targetsToBeDealtDamage.cardInstanceIdList.length; i++) {
      let currentTargetCard: RuntimeCard = state.getCardFromAnywhere(
        targetsToBeDealtDamage.cardInstanceIdList[i]
      );

      // check if the card still satisfies conditions
      if (!damageTargetType.cardSatisfiesConditions(currentTargetCard)) break;

      // these effect values should have a list of ints for each of the cards in targetsToBeDealtDamage
      let hitDivineShield: boolean =
        this.getEffectValue(EffectValueType.HitDivineShield).modInts[i]
          .effectiveValue == 1;
      let damageAmount: number = this.getEffectValue(
        EffectValueType.DamageAmount
      ).modInts[i].effectiveValue;

      if (!hitDivineShield) {
        currentTargetCard.health.baseValue -= damageAmount;
      }
    }
  }
}

export default DealSetDamageEffect;
