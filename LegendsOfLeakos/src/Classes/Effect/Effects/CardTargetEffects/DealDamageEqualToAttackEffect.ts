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

class DealDamageEqualToAttackEffect extends EntityEffect {
  // Effect Creation Static Vars

  // variables and methods to help with the creation of these effects by a person in the card creator
  override myRequiredEffectValues(): Array<EffectValueCreatorInfo> {
    let tempList: Array<EffectValueCreatorInfo> = [
      new EffectValueCreatorInfo(EffectValueType.DamageAmount, false),
      new EffectValueCreatorInfo(EffectValueType.HitDivineShield, false),
    ];
    for (let x of super.myRequiredEffectValues()) {
      tempList.push(x);
    }
    return tempList;
  }

  override numberOfTargetTypes(): number {
    return 1;
    // TargetInfoList[0] = Targets to be dealt damage based on their own attack
  }

  override targetTypeInfoList(): Array<TargetTypeInfo> {
    let list: Array<TargetTypeInfo> = [];
    list.push(
      new TargetTypeInfo(
        'Targets Damaged', // name
        'These are the targets that are damaged. They are damaged based on their attack stat. One must remain in order to not sizzle.', // description
        'Targets must be cards',
        1, // minMinSelectionsRequired
        null // maxMaxSelectionsRequired
      )
    );
    return list;
  }

  // Effect To Text

  override effectToString(): string {
    let outText =
      'Deal damage to up to ' +
      this.targetTypes[0].maxSelectionsAllowed.toString() +
      ' targets equal to their attack.';
    return outText;
  }

  // constructor
  constructor(
    setEffectValues: Array<EffectValue>,
    setTargetTypes: Array<TargetType>
  ) {
    super();
    this.effectEnum = EffectType.DealDamageEqualToAttack;
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
    let damageAmountEV: EffectValue = this.getEffectValue(
      EffectValueType.DamageAmount
    );
    let targetsToBeDealtDamage: TargetInfo = targetInfoList[0];

    damageAmountEV.fitToTargetInfo(targetsToBeDealtDamage);

    for (let i = 0; i < damageAmountEV.modInts.length; i++) {
      let card: RuntimeCard = state.getCardFromAnywhere(
        targetsToBeDealtDamage.cardInstanceIdList[i]
      );
      damageAmountEV.modInts[i].baseValue = card.attack.effectiveValue;
    }

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
  ): void {
    if (!this.isCardStillInPlay(sourceEntity)) return;

    let targetsToBeDealtDamage: TargetInfo = targetInfoList[0];
    let damageTargetType: TargetType = this.targetTypes[0];

    for (let i = 0; i < targetsToBeDealtDamage.cardInstanceIdList.length; i++) {
      let currentTargetCard: RuntimeCard = state.getCardFromAnywhere(
        targetsToBeDealtDamage.cardInstanceIdList[i]
      );

      // if the card has since moved since we targeted it or otherwise doesn't satisfy conditions anymore
      if (!damageTargetType.cardSatisfiesConditions(currentTargetCard)) break;

      let hitDivineShield: boolean =
        this.getEffectValue(EffectValueType.HitDivineShield).modInts[i]
          .effectiveValue == 0;
      let damageAmount: number = this.getEffectValue(
        EffectValueType.DamageAmount
      ).modInts[i].effectiveValue;

      if (!hitDivineShield) {
        currentTargetCard.health.baseValue -= damageAmount;
      }
    }
  }
}

export default DealDamageEqualToAttackEffect;
