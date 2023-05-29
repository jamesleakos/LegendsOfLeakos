import BaseAbility from './BaseAbility';
import Effect from '../Effect/Effect';
import { PhaseEnum } from '../../Enums/Phase';
import { AbilityType } from '../../Enums/Ability';

class BattlecryAbility extends BaseAbility {
  constructor(setName: string, setEffect: Effect, usableInPhases: PhaseEnum[]) {
    super();
    this.name = setName;
    this.type = AbilityType.Battlecry;
    this.effect = setEffect;
    this.usableInPhases = [...usableInPhases];
  }

  static fromJSON(json: any): BattlecryAbility {
    const temp = new BattlecryAbility(
      json.name,
      Effect.fromJSON(json.effect),
      json.usableInPhases
    );
    return temp;
  }
}

export default BattlecryAbility;
