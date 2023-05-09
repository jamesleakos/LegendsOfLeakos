import { EffectValueType } from '../../Enums/Effect';
import ModifiableInt from '../ModifableInt/ModifiableInt';

class EffectValueUpgrade {
  public effectValueType: EffectValueType;
  public setValueChange: ModifiableInt;

  constructor(type: EffectValueType, modInt: ModifiableInt) {
    this.effectValueType = type;
    this.setValueChange = new ModifiableInt(
      modInt.baseValue,
      modInt.intModifiers
    );
  }
}

export default EffectValueUpgrade;
