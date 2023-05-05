import EntityReliantOnEntityCondition from '../EntityReliantOnEntityCondition';
import ConditionValue from '../ConditionValue';
import AbilityKeywordRuntimeEntity from '../../Entity/AbilityKeywordRuntimeEntity';
import { ConditionType, ConditionValueType } from '../../../Enums/Condition';
import { KeywordType } from '../../../Enums/Keyword';

class EntitiesInSameZoneCondition extends EntityReliantOnEntityCondition {
  constructor(conditionType: ConditionType, conditionValues: ConditionValue[]) {
    super();
    this.assignConditionValues(conditionType, conditionValues);
  }

  requiredConditionValues(): ConditionValueType[] {
    const tempList: ConditionValueType[] = [];
    tempList.push(...super.requiredConditionValues());
    return tempList;
  }

  getReadableString(): string {
    return (
      'Has Keyword ' +
      (this.getConditionValue(ConditionValueType.HasKeywordOfKeywordType)
        .values[0] as KeywordType)
    );
  }

  isTrue(
    targetEntity: AbilityKeywordRuntimeEntity,
    reliantEntity: AbilityKeywordRuntimeEntity
  ): boolean {
    return targetEntity.residingZone === reliantEntity.residingZone;
  }
}

export default EntitiesInSameZoneCondition;
