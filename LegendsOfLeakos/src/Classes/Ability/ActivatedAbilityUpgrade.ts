import BaseAbilityUpgrade from './BaseAbilityUpgrade';
import EffectUpgrade from '../Effect/EffectUpgrade';
import { PhaseEnum } from '../../Enums/Phase';
import { AbilityType } from '../../Enums/Ability';
import ActivatedAbility from './ActivatedAbility';
import PayResourceCost from '../PayResourceCost/PayResourceCost';
import PayResourceCostUpgrade from '../PayResourceCost/PayResourceCostUpgrade';
import ModifiableInt from '../ModifableInt/ModifiableInt';
import BaseAbility from './BaseAbility';

class ActivatedAbilityUpgrade extends BaseAbilityUpgrade {
  public costUpgrades: PayResourceCostUpgrade[];
  public usesPerTurnChange: ModifiableInt;
  public isActive: boolean;

  constructor(
    abilityIndex: number,
    effectUpgrade: EffectUpgrade,
    addUsablePhases: PhaseEnum[],
    removeUsablePhases: PhaseEnum[],
    costUpgrades: PayResourceCostUpgrade[],
    usesPerTurnChange: ModifiableInt,
    isActive: boolean
  ) {
    super();
    this.abilityUpgradeIndex = abilityIndex;
    this.effectUpgrade = new EffectUpgrade(
      effectUpgrade.effectEnum,
      effectUpgrade.effectValueUpgrades,
      effectUpgrade.targetTypeUpgrades
    );
    this.usesPerTurnChange = new ModifiableInt(
      usesPerTurnChange.baseValue,
      usesPerTurnChange.effectValueIntModifiers
    );
    this.abilityUpgradeIndex = abilityIndex;
    this.isActive = isActive;

    this.addUsablePhases = [...addUsablePhases];
    this.removeUsablePhases = [...removeUsablePhases];
    this.costUpgrades = costUpgrades.map(
      (upgrade) =>
        new PayResourceCostUpgrade(upgrade.statId, upgrade.valueChange)
    );
  }

  public override upgradeAbility(ability: BaseAbility): void {
    super.upgradeAbility(ability);
    if (!(ability instanceof ActivatedAbility)) return;

    (ability as ActivatedAbility).usesPerTurn +=
      this.usesPerTurnChange.effectiveValue;

    for (const costUpgrade of this.costUpgrades) {
      const cost = (ability as ActivatedAbility).costs.find(
        (c) => c.statId === costUpgrade.statId
      );
      if (cost) {
        cost.value += costUpgrade.valueChange.effectiveValue;
      } else {
        (ability as ActivatedAbility).costs.push(
          new PayResourceCost(
            costUpgrade.statId,
            costUpgrade.valueChange.effectiveValue
          )
        );
      }
    }
    (ability as ActivatedAbility).isActive = this.isActive;
  }

  static fromJSON(json: any): ActivatedAbilityUpgrade {
    return new ActivatedAbilityUpgrade(
      json.abilityUpgradeIndex,
      EffectUpgrade.fromJSON(json.effectUpgrade),
      json.addUsablePhases,
      json.removeUsablePhases,
      json.costUpgrades.map((c: any) => PayResourceCostUpgrade.fromJSON(c)),
      ModifiableInt.fromJSON(json.usesPerTurnChange),
      json.isActive
    );
  }
}

export default ActivatedAbilityUpgrade;
