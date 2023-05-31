import { KeywordType, KeywordValueType } from '../../Enums/Keyword';
import LibraryKeywordValue from './LibraryKeywordValue';
import { Condition } from '../Condition/Condition';
import KeywordValue from './KeywordValue';

type RequiredKeywordValueReturner = {
  list: LibraryKeywordValue[];
  wasSuccessful: boolean;
  message: string;
};

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

  public static requiredKeywordValues(
    keywordType: KeywordType
  ): RequiredKeywordValueReturner {
    let requiredKeywordValues: LibraryKeywordValue[] = [];

    switch (keywordType) {
      case KeywordType.DivineShield:
        let numberOfValuesNeeded = 1;
        let setByDesigner = true;

        let intList: number[] = [];
        for (let i = 0; i < numberOfValuesNeeded; i++) {
          intList.push(0);
        }
        let usesKV = new KeywordValue(KeywordValueType.uses, intList);
        let usesLib = new LibraryKeywordValue(
          usesKV,
          numberOfValuesNeeded,
          setByDesigner
        );
        requiredKeywordValues.push(usesLib);

        return {
          list: requiredKeywordValues,
          wasSuccessful: true,
          message: 'List successfully returned',
        };

      case KeywordType.Impetus:
      case KeywordType.Skirmisher:
      case KeywordType.Provoke:
      case KeywordType.Meek:
        return {
          list: requiredKeywordValues,
          wasSuccessful: true,
          message: 'List successfully returned',
        };
      case KeywordType.Shielded:
        return {
          list: requiredKeywordValues,
          wasSuccessful: false,
          message: 'Creator can not assign this keyword type to a Library Card',
        };
      case KeywordType.Warleader:
        let attackValuesNeeded = 1;

        let attackInts: number[] = [];
        for (let i = 0; i < attackValuesNeeded; i++) {
          attackInts.push(0);
        }
        let attackStatBuff = new KeywordValue(
          KeywordValueType.statCardBuffAttack,
          attackInts
        );
        let libraryAttackStatBuff = new LibraryKeywordValue(
          attackStatBuff,
          attackValuesNeeded,
          true
        );
        requiredKeywordValues.push(libraryAttackStatBuff);

        let healthValuesNeeded = 1;

        let healthInts: number[] = [];
        for (let i = 0; i < healthValuesNeeded; i++) {
          healthInts.push(0);
        }
        let healthStatBuff = new KeywordValue(
          KeywordValueType.statCardBuffHealth,
          healthInts
        );
        let libraryHealthStatBuff = new LibraryKeywordValue(
          healthStatBuff,
          healthValuesNeeded,
          true
        );
        requiredKeywordValues.push(libraryHealthStatBuff);

        return {
          list: requiredKeywordValues,
          wasSuccessful: true,
          message: 'List successfully returned',
        };

      default:
        throw new Error(
          'This keyword is not in the list, you must design it here'
        );
    }
  }

  public getKeywordValueList(): KeywordValue[] {
    let KVList: KeywordValue[] = [];

    for (let lkv of this.keywordValueList) {
      let intlist: number[] = [];

      for (let i of lkv.keywordValue.values) {
        intlist.push(i);
      }

      let tempKV = new KeywordValue(lkv.keywordValue.keywordValueType, intlist);
      KVList.push(tempKV);
    }

    return KVList;
  }

  toJSON(): any {
    return {
      keywordType: this.keywordType.toString(),
      indexForUpgrades: this.indexForUpgrades,
      designerDescription: this.designerDescription,
      isPermanent: this.isPermanent,
      duration: this.duration,
      startsActive: this.startsActive,
      conditions: this.conditions.map((c) => {
        return c.toJSON();
      }),
      imageName: this.imageName,
    };
  }

  static fromJSON(json: any): LibraryKeyword {
    const keywordType: number = json.keywordType;
    const indexForUpgrades: number = json.indexForUpgrades;
    const designerDescription: string = json.designerDescription;
    const isPermanent: boolean = json.isPermanent;
    const duration: number = json.duration;
    const startsActive: boolean = json.startsActive;
    const conditions: Condition[] = json.conditions.map((c: any) => {
      return Condition.fromJSON(c);
    });
    const imageName = json.imageName;

    return new LibraryKeyword(
      keywordType,
      indexForUpgrades,
      designerDescription,
      isPermanent,
      duration,
      startsActive,
      conditions,
      imageName
    );
  }
}

export default LibraryKeyword;
