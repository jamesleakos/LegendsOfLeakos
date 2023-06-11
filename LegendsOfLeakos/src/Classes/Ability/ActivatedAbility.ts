import BaseAbility from './BaseAbility';
import PayResourceCost from '../PayResourceCost/PayResourceCost';
import Effect from '../Effect/Effect';
import { PhaseEnum } from '../../Enums/Phase';
import { AbilityType } from '../../Enums/Ability';
// Import other required classes and types

class ActivatedAbility extends BaseAbility {
  indexForUpgrades: number;
  // doubles as starts active if saved in the library
  isActive: boolean;
  costs: PayResourceCost[] = [];
  usesPerTurn: number;
  usesRemaining: number;

  constructor(
    indexForUpgrades: number,
    setName: string,
    setEffect: Effect,
    setCosts: PayResourceCost[],
    setUsesPerTurn: number,
    setUsesRemaining: number,
    usableInPhases: PhaseEnum[],
    isActive: boolean,
    image: string
  ) {
    super();

    this.name = setName;
    this.indexForUpgrades = indexForUpgrades;
    this.type = AbilityType.Activated;
    this.effect = setEffect;
    this.isActive = isActive;

    setCosts.forEach((cost) => {
      const temp = new PayResourceCost(cost.statId, cost.value);
      this.costs.push(temp);
    });

    this.usesPerTurn = setUsesPerTurn;
    this.usesRemaining = setUsesRemaining;

    usableInPhases.forEach((phase) => {
      this.usableInPhases.push(phase);
    });

    this.image = image;
  }

  onEndTurn(): void {
    this.usesRemaining = this.usesPerTurn;
    this.effect.onEndTurn();
  }

  public static createActivatedAbility(
    indexForUpgrades: number,
    abilityName: string,
    effect: Effect,
    costs: PayResourceCost[],
    usesPerTurn: number,
    usesRemaining: number,
    usableInPhases: PhaseEnum[],
    isActive: boolean,
    imageName: string
  ): ActivatedAbility {
    let AA = new ActivatedAbility(
      indexForUpgrades,
      abilityName,
      effect,
      costs,
      usesPerTurn,
      usesRemaining,
      usableInPhases,
      isActive,
      imageName
    );
    return AA;
  }

  toJSON(): any {
    return {
      indexForUpgrades: this.indexForUpgrades,
      name: this.name,
      effect: this.effect.toJSON(),
      costs: this.costs.map((cost) => cost.toJSON()),
      usesPerTurn: this.usesPerTurn,
      usesRemaining: this.usesRemaining,
      usableInPhases: this.usableInPhases.map((phase) => phase.toString()),
      isActive: this.isActive,
      image: this.image,
    };
  }

  static fromJSON(json: any): ActivatedAbility {
    return ActivatedAbility.createActivatedAbility(
      json.indexForUpgrades,
      json.name,
      Effect.fromJSON(json.effect),
      json.costs.map((cost: any) => PayResourceCost.fromJSON(cost)),
      json.usesPerTurn,
      json.usesRemaining,
      json.usableInPhases.map(
        (phase: any) => PhaseEnum[phase as keyof typeof PhaseEnum]
      ),
      json.isActive,
      json.image
    );
  }
}

export default ActivatedAbility;
