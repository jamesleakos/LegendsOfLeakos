import { ConditionType, ConditionValueType } from '../../../../Enums/Condition';

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

  /**
   * Returns a readable string representing this condition.
   * @param config The game's configuration.
   * @returns A readable string that represents this condition.
   */
  public abstract getReadableString(config: GameConfiguration): string;

  /**
   * Returns a readable string representing the specified condition operator.
   * @param op The condition operator.
   * @returns A readable string that represents the specified condition operator.
   */
  public static getReadableConditionOperator(op: ConditionOperator): string {
    switch (op) {
      case ConditionOperator.LessThan:
        return '<';
      case ConditionOperator.LessThanOrEqualTo:
        return '<=';
      case ConditionOperator.EqualTo:
        return '==';
      case ConditionOperator.GreaterThanOrEqualTo:
        return '>=';
      default:
        return '>';
    }
  }
}
