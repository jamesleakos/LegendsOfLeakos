import { Condition } from '../Condition/Condition';
import ModifiableInt from '../ModifableInt/ModifiableInt';
import { ConditionType } from '../../Enums/Condition';
import {
  TargetTypeEnum,
  TargetableTypeSelectionEnum,
} from '../../Enums/Target';

class TargetTypeUpgrade {
  public targetTypeIndex: number;
  public newTargetTypeEnum: TargetTypeEnum;
  public newTargetableTypeSelectionEnum: TargetableTypeSelectionEnum;
  public minSelectionsRequiredChange: ModifiableInt;
  public maxSelectionsAllowedChange: ModifiableInt;
  public minSelectionsThatMustRemainChange: ModifiableInt;
  public newConditions: Condition[];
  public removeCondtionsOfType: ConditionType[];

  constructor(
    targetTypeIndex: number,
    newTargetTypeEnum: TargetTypeEnum,
    newTargetableTypeSelectionEnum: TargetableTypeSelectionEnum,
    minSelectionsRequiredChange: ModifiableInt,
    maxSelectionsAllowedChange: ModifiableInt,
    minSelectionsThatMustRemainChange: ModifiableInt,
    newConditions: Condition[],
    removeCondtionsOfType: ConditionType[]
  ) {
    this.targetTypeIndex = targetTypeIndex;
    this.newTargetTypeEnum = newTargetTypeEnum;
    this.newTargetableTypeSelectionEnum = newTargetableTypeSelectionEnum;
    this.minSelectionsRequiredChange = new ModifiableInt(
      minSelectionsRequiredChange.baseValue,
      minSelectionsRequiredChange.effectValueIntModifiers
    );
    this.maxSelectionsAllowedChange = new ModifiableInt(
      maxSelectionsAllowedChange.baseValue,
      maxSelectionsAllowedChange.effectValueIntModifiers
    );
    this.minSelectionsThatMustRemainChange = new ModifiableInt(
      minSelectionsThatMustRemainChange.baseValue,
      minSelectionsThatMustRemainChange.effectValueIntModifiers
    );

    this.newConditions = newConditions.map(
      (c) =>
        Condition.createCondition(c.conditionType, c.conditionValues).condition
    );

    this.removeCondtionsOfType = [...removeCondtionsOfType];
  }
}

export default TargetTypeUpgrade;
