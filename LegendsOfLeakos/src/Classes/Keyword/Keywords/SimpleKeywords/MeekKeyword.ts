import RuntimeKeyword from '../../RuntimeKeyword';
import KeywordValue from '../../KeywordValue';
import { KeywordType } from '../../../../Enums/Keyword';
import { Condition } from '../../../Condition/Condition';

class MeekKeyword extends RuntimeKeyword {
  constructor(
    myEntityId: number,
    keywordType: KeywordType,
    indexForUpgrades: number | null,
    setDescription: string,
    setIsPermanent: boolean,
    setDuration: number,
    keywordValueList: KeywordValue[],
    isActive: boolean,
    conditions: Condition[],
    imageName: string
  ) {
    super();
    this.setBaseData(
      myEntityId,
      keywordType,
      indexForUpgrades,
      setDescription,
      setIsPermanent,
      setDuration,
      keywordValueList,
      isActive,
      conditions,
      imageName
    );
  }
}

export default MeekKeyword;
