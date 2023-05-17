import CardCondition from '../CardCondition';
import ConditionValue from '../ConditionValue';
import RuntimeCard from '../../Card/RuntimeCard';
import { ConditionType, ConditionValueType } from '../../../Enums/Condition';
import { KeywordType } from '../../../Enums/Keyword';

class HasKeywordCardCondition extends CardCondition {
  constructor(conditionType: ConditionType, conditionValues: ConditionValue[]) {
    super();
    this.assignConditionValues(conditionType, conditionValues);
  }

  requiredConditionValues(): ConditionValueType[] {
    const tempList: ConditionValueType[] = [
      ConditionValueType.HasKeywordOfKeywordType,
      ...super.requiredConditionValues(),
    ];
    return tempList;
  }

  getReadableString(): string {
    return (
      'Has Keyword ' +
      this.getConditionValue(ConditionValueType.HasKeywordOfKeywordType)
        .values[0]
    );
  }

  isTrue(card: RuntimeCard): boolean {
    let hasAllRequired = true;
    for (const i of this.getConditionValue(
      ConditionValueType.HasKeywordOfKeywordType
    ).values) {
      if (
        card.runtimeKeywords.find(
          (c) => c.keywordType.toString() === KeywordType[i]
        ) === null
      )
        hasAllRequired = false;
    }
    return hasAllRequired;
  }
}

export default HasKeywordCardCondition;
