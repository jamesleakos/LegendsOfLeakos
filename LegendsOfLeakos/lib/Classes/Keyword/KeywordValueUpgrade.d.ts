import { KeywordValueType } from '../../Enums/Keyword';
import ModifiableInt from '../ModifableInt/ModifiableInt';
declare class KeywordValueUpgrade {
    keywordValueType: KeywordValueType;
    valueChanges: ModifiableInt[];
    constructor(keywordValueType: KeywordValueType, valueChanges: ModifiableInt[]);
}
export default KeywordValueUpgrade;
