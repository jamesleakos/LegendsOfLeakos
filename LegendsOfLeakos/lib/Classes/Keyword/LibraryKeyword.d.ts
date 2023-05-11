import { KeywordType } from '../../Enums/Keyword';
import LibraryKeywordValue from './LibraryKeywordValue';
import { Condition } from '../Condition/Condition';
import KeywordValue from './KeywordValue';
type RequiredKeywordValueReturner = {
    list: LibraryKeywordValue[];
    wasSuccessful: boolean;
    message: string;
};
declare class LibraryKeyword {
    keywordType: KeywordType;
    indexForUpgrades: number;
    designerDescription: string;
    isPermanent: boolean;
    duration: number;
    startsActive: boolean;
    keywordValueList: Array<LibraryKeywordValue>;
    conditions: Array<Condition>;
    imageName: string;
    constructor(keywordType: KeywordType, indexForUpgrades: number, designerDescription: string, isPermanent: boolean, duration: number, startsActive: boolean, conditions: Array<Condition>, imageName: string);
    canBeAssignedToCardByPlayer(): boolean;
    static requiredKeywordValues(keywordType: KeywordType): RequiredKeywordValueReturner;
    getKeywordValueList(): KeywordValue[];
}
export default LibraryKeyword;
