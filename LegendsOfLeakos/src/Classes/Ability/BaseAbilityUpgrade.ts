import BaseAbility from './BaseAbility';

class BaseAbilityUpgrade {
  abilityUpgradeIndex: number;
  effectUpgrade: EffectUpgrade;
  addUsablePhases: PhaseEnum[];
  removeUsablePhases: PhaseEnum[];

  upgradeAbility(ability: BaseAbility): void {
    this.effectUpgrade.upgradeEffect(ability.effect);
    for (const phaseEnum of this.addUsablePhases) {
      if (!ability.usableInPhases.includes(phaseEnum)) {
        ability.usableInPhases.push(phaseEnum);
      }
    }
    for (const phaseEnum of this.removeUsablePhases) {
      ability.usableInPhases = ability.usableInPhases.filter(
        (c) => c !== phaseEnum
      );
    }
  }
}

export default BaseAbilityUpgrade;
