import BaseAbility from './BaseAbility';
import PayResourceCost from '../PayResourceCost/PayResourceCost';
import Effect from '../Effect/Effect';
import { PhaseEnum } from '../../Enums/Phase';
import { AbilityType } from '../../Enums/Ability';
// Import other required classes and types

class ActivatedAbility extends BaseAbility {
  indexForUpgrades: number;
  isActive: boolean;
  costs: PayResourceCost[] = [];
  usesPerTurn: number;
  usesRemaining: number;
  imageName: string;

  constructor(
    indexForUpgrades: number,
    setName: string,
    setEffect: Effect,
    setCosts: PayResourceCost[],
    setUsesPerTurn: number,
    setUsesRemaining: number,
    usableInPhases: PhaseEnum[],
    isActive: boolean,
    imageName: string
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

    this.imageName = imageName;
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
}

export default ActivatedAbility;
