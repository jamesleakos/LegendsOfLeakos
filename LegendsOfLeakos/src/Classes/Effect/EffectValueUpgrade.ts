import { EffectValueType } from '../../Enums/Effect';
import ModifiableInt from '../ModifableInt/ModifiableInt';

class EffectValueUpgrade {
  public effectValueType: EffectValueType;
  public setValueChange: ModifiableInt;

  constructor(type: EffectValueType, modInt: ModifiableInt) {
    this.effectValueType = type;
    this.setValueChange = new ModifiableInt(
      modInt.baseValue,
      modInt.effectValueIntModifiers
    );
  }

  static fromJSON(json: any): EffectValueUpgrade {
    return new EffectValueUpgrade(
      json.effectValueType,
      ModifiableInt.fromJSON(json.setValueChange)
    );
  }
}

export default EffectValueUpgrade;
