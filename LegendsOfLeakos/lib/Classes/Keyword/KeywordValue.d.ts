import { KeywordValueType } from '../../Enums/Keyword';
declare class KeywordValue {
    keywordValueType: KeywordValueType;
    values: number[];
    constructor(keywordValueType: KeywordValueType, values: number[]);
}
export default KeywordValue;
