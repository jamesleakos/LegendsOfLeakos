import { KeywordType } from '../../Enums/Keyword';
import LibraryKeywordValue from './LibraryKeywordValue';
import { Condition } from '../Condition/Condition';

class LibraryKeyword {
  keywordType: KeywordType;
  indexForUpgrades: number;
  designerDescription: string;
  isPermanent: boolean;
  duration: number;
  startsActive: boolean;
  keywordValueList: Array<LibraryKeywordValue>; // Don't need new, look down at the constructor
  conditions: Array<Condition> = [];
  imageName: string; // Don't need new, check out constructor

  constructor(
    keywordType: KeywordType,
    indexForUpgrades: number,
    designerDescription: string,
    isPermanent: boolean,
    duration: number,
    startsActive: boolean,
    conditions: Array<Condition>,
    imageName: string
  ) {
    this.keywordType = keywordType;
    this.indexForUpgrades = indexForUpgrades;
    this.designerDescription = designerDescription;
    this.isPermanent = isPermanent;
    this.duration = duration;
    this.startsActive = startsActive;
    this.imageName = imageName;

    this.keywordValueList =
      LibraryKeyword.requiredKeywordValues(keywordType).list;
    for (const c of conditions) {
      this.conditions.push(
        Condition.createCondition(c.conditionType, c.conditionValues).condition
      );
    }
  }

  // I'm not sure this will ever get used - we already have the KeywordTypeMethods over at RuntimeKeyword
  canBeAssignedToCardByPlayer(): boolean {
    switch (this.keywordType) {
      case KeywordType.DivineShield:
        return true;
      case KeywordType.Impetus:
        return true;
      case KeywordType.Skirmisher:
        return true;
      case KeywordType.Provoke:
        return true;
      case KeywordType.Meek:
        return true;
      case KeywordType.Shielded:
        return false;
      case KeywordType.Warleader:
        return true;
      default:
        throw new Error('That keyword is not in the list');
    }
  }

  static requiredKeywordValues(
    keywordType: KeywordType
  ): RequiredKeywordValueReturner {
    // Implement the method based on your application requirements
  }

  getKeywordValueList(): Array<KeywordValue> {
    // Implement the method based on your application requirements
  }
}

export default LibraryKeyword;
