import KeywordValue from './KeywordValue';

class LibraryKeywordValue {
  keywordValue: KeywordValue;
  numberOfValuesNeeded: number;
  setByDesigner: boolean;

  constructor(
    keywordValue: KeywordValue,
    numberOfValuesNeeded: number,
    setByDesigner: boolean
  ) {
    this.keywordValue = keywordValue;
    this.numberOfValuesNeeded = numberOfValuesNeeded;
    this.setByDesigner = setByDesigner;
  }
}

export default LibraryKeywordValue;
