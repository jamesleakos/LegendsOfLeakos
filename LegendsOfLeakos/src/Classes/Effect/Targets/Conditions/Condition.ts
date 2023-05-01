import { ConditionType, ConditionValueType } from '../../../../Enums/Condition';
import ConditionValue from './ConditionValue';

abstract class Condition {
  public conditionType: ConditionType;
  public conditionValues: ConditionValue[] = [];

  public getConditionValue(
    conditionValueEnum: ConditionValueType
  ): ConditionValue | undefined {
    return this.conditionValues.find(
      (x) => x.conditionValueType === conditionValueEnum
    );
  }

  public requiredConditionValues(): ConditionValueType[] {
    return [];
  }

  public assignConditionValues(
    conditionType: ConditionType,
    conditionValues: ConditionValue[]
  ): void {
    this.conditionType = conditionType;
    for (const cv of conditionValues) {
      this.conditionValues.push(
        new ConditionValue(cv.conditionValueType, cv.values)
      );
    }
  }

  public abstract getReadableString(gameProperties: any): string;
}
