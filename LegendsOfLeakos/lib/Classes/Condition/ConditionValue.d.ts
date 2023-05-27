import { ConditionValueType } from '../../Enums/Condition';
declare class ConditionValue {
    conditionValueType: ConditionValueType;
    values: Array<number>;
    constructor(conditionValueType: ConditionValueType, values: Array<number>);
    returnReadableStringOfValues(): string;
    getValueString(index: number): string;
    static fromJSON(json: any): ConditionValue;
}
export default ConditionValue;
