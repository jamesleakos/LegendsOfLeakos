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
        new ModifiableInt(c.baseValue, [...c.intModifiers])
      );
    });
  }
}

export default KeywordValueUpgrade;
