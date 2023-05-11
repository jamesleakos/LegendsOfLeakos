import CardCondition from '../CardCondition';
import ConditionValue from '../ConditionValue';
import RuntimeCard from '../../Card/RuntimeCard';
import { ConditionType, ConditionValueType } from '../../../Enums/Condition';
declare class HasKeywordCardCondition extends CardCondition {
    constructor(conditionType: ConditionType, conditionValues: ConditionValue[]);
    requiredConditionValues(): ConditionValueType[];
    getReadableString(): string;
    isTrue(card: RuntimeCard): boolean;
}
export default HasKeywordCardCondition;
