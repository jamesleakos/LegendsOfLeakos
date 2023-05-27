import { KeywordValueType } from '../../Enums/Keyword';
import ModifiableInt from '../ModifableInt/ModifiableInt';

class KeywordValueUpgrade {
  keywordValueType: KeywordValueType;
  valueChanges: ModifiableInt[] = [];

  constructor(
    keywordValueType: KeywordValueType,
    valueChanges: ModifiableInt[]
  ) {
    this.keywordValueType = keywordValueType;
    valueChanges.forEach((c) => {
      this.valueChanges.push(
        new ModifiableInt(c.baseValue, [...c.effectValueIntModifiers])
      );
    });
  }

  static fromJSON(json: any): KeywordValueUpgrade {
    const newKeywordValueUpgrade = new KeywordValueUpgrade(
      json.keywordValueType,
      new Array<ModifiableInt>()
    );
    json.valueChanges.forEach((c: any) => {
      newKeywordValueUpgrade.valueChanges.push(ModifiableInt.fromJSON(c));
    });
    return newKeywordValueUpgrade;
  }
}

export default KeywordValueUpgrade;
