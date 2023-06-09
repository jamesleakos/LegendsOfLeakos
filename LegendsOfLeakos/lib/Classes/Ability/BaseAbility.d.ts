import { AbilityType } from '../../Enums/EntityFeatures';
import Effect from '../Effect/Effect';
import { PhaseEnum } from '../../Enums/Phase';
declare class BaseAbility {
    name: string;
    image: string;
    type: AbilityType;
    effect: Effect;
    usableInPhases: PhaseEnum[];
}
export default BaseAbility;
