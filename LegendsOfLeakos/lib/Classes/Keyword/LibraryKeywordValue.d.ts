import KeywordValue from './KeywordValue';
declare class LibraryKeywordValue {
    keywordValue: KeywordValue;
    numberOfValuesNeeded: number;
    setByDesigner: boolean;
    constructor(keywordValue: KeywordValue, numberOfValuesNeeded: number, setByDesigner: boolean);
}
export default LibraryKeywordValue;
