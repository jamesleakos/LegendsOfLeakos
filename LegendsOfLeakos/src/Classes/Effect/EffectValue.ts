import { EffectValueType } from '../../Enums/Effect';
import ModifiableInt from '../ModifableInt/ModifiableInt';
import IntModifier from '../ModifableInt/IntModifier';

class EffectValue {
  effectValueType: EffectValueType;
  setValue: number;
  modInts: ModifiableInt[];

  constructor(
    effectValueType: EffectValueType,
    setValue: number,
    modInts: ModifiableInt[]
  ) {
    this.effectValueType = effectValueType;
    this.setValue = setValue;
    this.modInts = modInts.map(
      (i) => new ModifiableInt(i.baseValue, i.intModifiers)
    );
  }

  fitToTargetInfo(targetInfo: TargetInfo): void {
    const numberOfTargets = targetInfo.targetsAreZones
      ? targetInfo.zoneInstanceIdList.length
      : targetInfo.cardInstanceIdList.length;

    this.modInts = [];
    for (let i = 0; i < numberOfTargets; i++) {
      this.modInts.push(new ModifiableInt(this.setValue, []));
    }
  }

  modifyEffectValueInt(
    index: number,
    modifyValue: number,
    modifyPermanent: boolean
  ): void {
    this.modInts[index].intModifiers.push(
      new IntModifier(modifyValue, modifyPermanent)
    );
  }

  postEffect(): void {
    this.modInts.forEach((evInt) => {
      evInt.intModifiers = evInt.intModifiers.filter((c) => c.permanent);
    });
  }

  contains(x: number): boolean {
    return this.modInts.some((i) => i.effectiveValue === x);
  }

  effectiveValues(): number[] {
    return this.modInts.map((evInt) => evInt.effectiveValue);
  }
}

export default EffectValue;
