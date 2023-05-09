import { EffectType } from '../../Enums/Effect';
import EffectValueUpgrade from '../Effect/EffectValueUpgrade';
import Effect from './Effect';
import TargetTypeUpgrade from '../Target/TargetTypeUpgrade';
import { TargetableTypeSelectionEnum } from '../../Enums/Target';
import { Condition } from '../Condition/Condition';

class EffectUpgrade {
  public effectEnum: EffectType;
  public effectValueUpgrades: EffectValueUpgrade[];
  public targetTypeUpgrades: TargetTypeUpgrade[];

  constructor(
    effectType: EffectType,
    effectValueUpgrades: EffectValueUpgrade[],
    targetTypeUpgrades: TargetTypeUpgrade[]
  ) {
    this.effectEnum = effectType;

    this.effectValueUpgrades = effectValueUpgrades.map(
      (upgrade) =>
        new EffectValueUpgrade(upgrade.effectValueType, upgrade.setValueChange)
    );

    this.targetTypeUpgrades = targetTypeUpgrades.map(
      (upgrade) =>
        new TargetTypeUpgrade(
          upgrade.targetTypeIndex,
          upgrade.newTargetTypeEnum,
          upgrade.newTargetableTypeSelectionEnum,
          upgrade.minSelectionsRequiredChange,
          upgrade.maxSelectionsAllowedChange,
          upgrade.minSelectionsThatMustRemainChange,
          upgrade.newConditions,
          upgrade.removeCondtionsOfType
        )
    );
  }

  public upgradeEffect(effect: Effect): void {
    if (effect.effectEnum !== this.effectEnum) return;
    for (const evu of this.effectValueUpgrades) {
      const ev = effect.effectValueList.find(
        (c) => c.effectValueType === evu.effectValueType
      );
      if (ev) {
        ev.setValue += evu.setValueChange.effectiveValue;
      }
    }
    for (const ttu of this.targetTypeUpgrades) {
      if (effect.targetTypes.length <= ttu.targetTypeIndex) continue;
      const tt = effect.targetTypes[ttu.targetTypeIndex];
      tt.targetTypeEnum = ttu.newTargetTypeEnum;
      tt.targetableTypeSelectionEnum = ttu.newTargetableTypeSelectionEnum;
      tt.playerSelectsTarget =
        ttu.newTargetableTypeSelectionEnum !==
        TargetableTypeSelectionEnum.AutoTarget;
      tt.minSelectionsRequired +=
        ttu.minSelectionsRequiredChange.effectiveValue;
      tt.maxSelectionsAllowed += ttu.maxSelectionsAllowedChange.effectiveValue;
      tt.minSelectionsThatMustRemain +=
        ttu.minSelectionsThatMustRemainChange.effectiveValue;
      for (const c of ttu.newConditions) {
        tt.conditions.push(
          Condition.createCondition(c.conditionType, c.conditionValues)
            .condition
        );
      }
      for (const ct of ttu.removeCondtionsOfType) {
        tt.conditions = tt.conditions.filter((c) => c.conditionType !== ct);
      }
    }
  }
}

export default EffectUpgrade;
