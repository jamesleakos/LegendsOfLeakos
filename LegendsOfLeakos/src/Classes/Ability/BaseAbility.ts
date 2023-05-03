import { AbilityType } from '../../Enums/EntityFeatures';
import Effect from '../Effect/Effect';
import { PhaseEnum } from '../../Enums/Phase';

class BaseAbility {
  public name: string;
  public iamge: string;
  public type: AbilityType;

  public effect: Effect;
  public usableInPhases: PhaseEnum[];
}

export default BaseAbility;
