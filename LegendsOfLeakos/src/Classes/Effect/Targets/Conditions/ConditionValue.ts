import { ConditionType, ConditionValueType } from '../../../../Enums/Condition';
import { ZoneEnum } from '../../../../Enums/Zone';
import { KeywordType } from '../../../../Enums/Keyword';

class ConditionValue {
  conditionValueType: ConditionValueType;
  values: Array<number> = [];

  constructor(conditionValueType: ConditionValueType, values: Array<number>) {
    this.conditionValueType = conditionValueType;
    for (const v of values) {
      this.values.push(v);
    }
  }

  returnReadableStringOfValues(): string {
    let tempString = '';
    for (let i = 0; i < this.values.length; i++) {
      tempString += this.getValueString(this.values[i]);
      if (i < this.values.length - 1) tempString += ', ';
    }
    return tempString;
  }

  getValueString(index: number): string {
    switch (this.conditionValueType) {
      case ConditionValueType.HasKeywordOfKeywordType:
        return KeywordType[index].toString();
      case ConditionValueType.IsInZoneOfZoneID:
        return ZoneEnum[index].toString();
      default:
        return 'Not found - Come Look for Error';
    }
  }
}

export default ConditionValue;
