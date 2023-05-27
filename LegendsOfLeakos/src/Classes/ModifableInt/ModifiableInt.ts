import IntModifier from './IntModifier';

class ModifiableInt {
  baseValue: number;
  effectValueIntModifiers: IntModifier[];

  constructor(baseValue: number, effectValueIntModifiers: IntModifier[]) {
    this.baseValue = baseValue;
    this.effectValueIntModifiers = [];
    for (const i of effectValueIntModifiers) {
      this.effectValueIntModifiers.push(new IntModifier(i.value, i.permanent));
    }
  }

  get effectiveValue(): number {
    let value = this.baseValue;

    for (const modifier of this.effectValueIntModifiers) {
      value += modifier.value;
    }

    return value;
  }

  static fromJSON(json: any): ModifiableInt {
    const newModifiableInt = new ModifiableInt(
      json.baseValue,
      new Array<IntModifier>()
    );
    return newModifiableInt;
  }
}

export default ModifiableInt;
