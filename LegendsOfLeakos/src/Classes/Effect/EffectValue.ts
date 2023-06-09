import { EffectValueType } from '../../Enums/Effect';
import ModifiableInt from '../ModifableInt/ModifiableInt';
import IntModifier from '../ModifableInt/IntModifier';
import TargetInfo from '../Target/TargetInfo';

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
      (i) => new ModifiableInt(i.baseValue, i.effectValueIntModifiers)
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
    this.modInts[index].effectValueIntModifiers.push(
      new IntModifier(modifyValue, modifyPermanent)
    );
  }

  postEffect(): void {
    this.modInts.forEach((evInt) => {
      evInt.effectValueIntModifiers = evInt.effectValueIntModifiers.filter(
        (c) => c.permanent
      );
    });
  }

  contains(x: number): boolean {
    return this.modInts.some((i) => i.effectiveValue === x);
  }

  effectiveValues(): number[] {
    return this.modInts.map((evInt) => evInt.effectiveValue);
  }

  toJSON(): any {
    return {
      effectValueType: this.effectValueType.toString(),
      setValue: this.setValue,
      modInts: this.modInts.map((i) => i.toJSON()),
    };
  }

  static fromJSON(json: any): EffectValue {
    return new EffectValue(
      // frim string
      EffectValueType[json.effectValueType as keyof typeof EffectValueType],
      json.setValue,
      json.modInts.map((i: any) => ModifiableInt.fromJSON(i))
    );
  }
}

export default EffectValue;
