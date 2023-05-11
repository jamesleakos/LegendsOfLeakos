import RuntimeKeyword from '../../RuntimeKeyword';
import KeywordValue from '../../KeywordValue';
import { KeywordType } from '../../../../Enums/Keyword';
import { Condition } from '../../../Condition/Condition';
declare class ImpetusKeyword extends RuntimeKeyword {
    constructor(myEntityId: number, keywordType: KeywordType, indexForUpgrades: number | null, setDescription: string, setIsPermanent: boolean, setDuration: number, keywordValueList: KeywordValue[], isActive: boolean, conditions: Condition[], imageName: string);
}
export default ImpetusKeyword;
