import { ConditionType, ConditionValueType } from '../../Enums/Condition';
import ConditionValue from './ConditionValue';
type ConditionFactoryPackage = {
    condition: Condition;
    wasSuccessful: boolean;
    message: string;
};
declare abstract class Condition {
    conditionType: ConditionType;
    conditionValues: ConditionValue[];
    getConditionValue(conditionValueEnum: ConditionValueType): ConditionValue | undefined;
    requiredConditionValues(): ConditionValueType[];
    assignConditionValues(conditionType: ConditionType, conditionValues: ConditionValue[]): void;
    abstract getReadableString(gameProperties: any): string;
    static createCondition(conditionType: ConditionType, conditionValues: ConditionValue[]): ConditionFactoryPackage;
    static createConditionForDeckBuilder(conditionType: ConditionType): Condition;
}
export { Condition, ConditionFactoryPackage };
