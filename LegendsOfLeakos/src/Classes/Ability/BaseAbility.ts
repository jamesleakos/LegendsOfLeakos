import { AbilityType } from '../../Enums/EntityFeatures';
import { Effect } from './Effect';
import { PhaseEnum } from '../../Enums/Phase';

export class Ability {
  public name: string;
  public iamge: string;
  public type: AbilityType;

  public effect: Effect;
  public usableInPhases: PhaseEnum[];
}
