import { ConditionType, ConditionValueType } from '../../Enums/Condition';
import ConditionValue from './ConditionValue';
import HasKeywordCardCondition from './Conditions/HasKeywordCardCondition';
import EntitiesInSameZoneCondition from './Conditions/EntitiesInSameZoneCondition';

type ConditionFactoryPackage = {
  condition: Condition;
  wasSuccessful: boolean;
  message: string;
};

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

  public static createCondition(
    conditionType: ConditionType,
    conditionValues: ConditionValue[]
  ): ConditionFactoryPackage {
    let outCondition: Condition | null = null;

    if (conditionType === ConditionType.HasKeywordCardCondition) {
      outCondition = new HasKeywordCardCondition(
        conditionType,
        conditionValues
      );
    }

    if (conditionType === ConditionType.EntitiesInSameZone) {
      outCondition = new EntitiesInSameZoneCondition(
        conditionType,
        conditionValues
      );
    }

    let success = true;
    let message = 'Condition created successfully';

    if (outCondition === null) {
      success = false;
      message =
        'Condition was not created. Check if conditionValueEnum was correct';
    }
    for (const cv of conditionValues) {
      if (
        !outCondition.requiredConditionValues().includes(cv.conditionValueType)
      ) {
        throw new Error('Something not implemented here');
      }
    }
    return {
      condition: outCondition,
      wasSuccessful: success,
      message: message,
    };
  }

  public static createConditionForDeckBuilder(
    conditionType: ConditionType
  ): Condition {
    const condition = this.createCondition(conditionType, []).condition;
    for (const cv of condition.requiredConditionValues()) {
      const temp = new ConditionValue(cv, []);
      temp.values.push(0);
      condition.conditionValues.push(temp);
    }
    return condition;
  }
}

export { Condition, ConditionFactoryPackage };
