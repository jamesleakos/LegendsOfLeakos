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

  toJSON(): any {
    return {
      name: this.name,
      type: this.type,
      effect: this.effect.toJSON(),
      // map enums to strings
      usableInPhases: this.usableInPhases.map((phase) => phase.toString()),
    };
  }

  static fromJSON(json: any): BattlecryAbility {
    const temp = new BattlecryAbility(
      json.name,
      Effect.fromJSON(json.effect),
      json.usableInPhases.map(
        (phase: string) => PhaseEnum[phase as keyof typeof PhaseEnum]
      )
    );
    return temp;
  }
}

export default BattlecryAbility;
