import CardCondition from '../CardCondition';
import ConditionValue from '../ConditionValue';
import RuntimeCard from '../../Card/RuntimeCard';
import { ConditionType, ConditionValueType } from '../../../Enums/Condition';
import { KeywordType } from '../../../Enums/Keyword';

class CardIsInAcceptableZoneCondition extends CardCondition {
  constructor(conditionType: ConditionType, conditionValues: ConditionValue[]) {
    super();
    this.assignConditionValues(conditionType, conditionValues);
  }

  requiredConditionValues(): ConditionValueType[] {
    const tempList: ConditionValueType[] = [
      ConditionValueType.IsInZoneOfZoneID,
      ...super.requiredConditionValues(),
    ];
    return tempList;
  }

  getReadableString(): string {
    let zones = '';
    for (const i of this.getConditionValue(ConditionValueType.IsInZoneOfZoneID)
      .values) {
      zones = zones + i.toString() + '; ';
    }
    return 'Is in zone ' + zones;
  }

  isTrue(card: RuntimeCard): boolean {
    return this.getConditionValue(
      ConditionValueType.IsInZoneOfZoneID
    ).values.includes(card.residingZone.zoneId);
  }
}
