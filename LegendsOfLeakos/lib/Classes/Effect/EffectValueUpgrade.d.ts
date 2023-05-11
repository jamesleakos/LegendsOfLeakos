import { EffectValueType } from '../../Enums/Effect';
import ModifiableInt from '../ModifableInt/ModifiableInt';
declare class EffectValueUpgrade {
    effectValueType: EffectValueType;
    setValueChange: ModifiableInt;
    constructor(type: EffectValueType, modInt: ModifiableInt);
}
export default EffectValueUpgrade;
