import IntModifier from './IntModifier';

class ModifiableInt {
  baseValue: number;
  intModifiers: Array<IntModifier>;

  constructor(baseValue: number, effectValueIntModifiers: Array<IntModifier>) {
    this.baseValue = baseValue;
    this.intModifiers = [];
    for (const i of effectValueIntModifiers) {
      this.intModifiers.push(new IntModifier(i.value, i.permanent));
    }
  }

  get effectiveValue(): number {
    let value = this.baseValue;

    for (const modifier of this.intModifiers) {
      value += modifier.value;
    }

    return value;
  }
}

export default ModifiableInt;
