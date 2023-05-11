import { Condition } from '../Condition/Condition';
import ModifiableInt from '../ModifableInt/ModifiableInt';
import { ConditionType } from '../../Enums/Condition';
import { TargetTypeEnum, TargetableTypeSelectionEnum } from '../../Enums/Target';
declare class TargetTypeUpgrade {
    targetTypeIndex: number;
    newTargetTypeEnum: TargetTypeEnum;
    newTargetableTypeSelectionEnum: TargetableTypeSelectionEnum;
    minSelectionsRequiredChange: ModifiableInt;
    maxSelectionsAllowedChange: ModifiableInt;
    minSelectionsThatMustRemainChange: ModifiableInt;
    newConditions: Condition[];
    removeCondtionsOfType: ConditionType[];
    constructor(targetTypeIndex: number, newTargetTypeEnum: TargetTypeEnum, newTargetableTypeSelectionEnum: TargetableTypeSelectionEnum, minSelectionsRequiredChange: ModifiableInt, maxSelectionsAllowedChange: ModifiableInt, minSelectionsThatMustRemainChange: ModifiableInt, newConditions: Condition[], removeCondtionsOfType: ConditionType[]);
}
export default TargetTypeUpgrade;
