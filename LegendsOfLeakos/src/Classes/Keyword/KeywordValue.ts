import { KeywordValueType } from '../../Enums/Keyword';

class KeywordValue {
  keywordValueType: KeywordValueType;
  values: number[];

  constructor(keywordValueType: KeywordValueType, values: number[]) {
    this.keywordValueType = keywordValueType;
    this.values = [...values];
  }
}

export default KeywordValue;
