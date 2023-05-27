import { KeywordType } from '../../Enums/Keyword';
import ModifiableInt from '../ModifableInt/ModifiableInt';
import KeywordValueUpgrade from './KeywordValueUpgrade';
import RuntimeKeyword from './RuntimeKeyword';
import CardCondition from '../Condition/CardCondition';
import { ConditionType } from '../../Enums/Condition';
import { Condition } from '../Condition/Condition';

class KeywordUpgrade {
  keywordType: KeywordType;
  keywordUpgradeIndex: number;
  isPermanent: boolean;
  durationChange: ModifiableInt;
  keywordValueUpgrades: KeywordValueUpgrade[] = [];
  isActive: boolean;

  newConditions: CardCondition[] = [];
  removeCondtionsOfType: ConditionType[] = [];

  constructor(
    keywordType: KeywordType,
    keywordUpgradeIndex: number,
    isPermanent: boolean,
    durationChange: ModifiableInt,
    keywordValueUpgrades: KeywordValueUpgrade[],
    isActive: boolean
  ) {
    this.keywordType = keywordType;
    this.keywordUpgradeIndex = keywordUpgradeIndex;
    this.isPermanent = isPermanent;
    this.durationChange = durationChange;
    keywordValueUpgrades.forEach((k) => {
      this.keywordValueUpgrades.push(
        new KeywordValueUpgrade(k.keywordValueType, k.valueChanges)
      );
    });
    this.isActive = isActive;
  }

  upgradeKeyword(keyword: RuntimeKeyword): void {
    if (
      keyword.keywordType !== this.keywordType ||
      keyword.indexForUpgrades !== this.keywordUpgradeIndex
    )
      return;
    keyword.isPermanent = this.isPermanent;
    keyword.duration += this.durationChange.effectiveValue;
    this.keywordValueUpgrades.forEach((kvu) => {
      const kv = keyword.keywordValueList.find(
        (c) => c.keywordValueType === kvu.keywordValueType
      );
      if (kv !== undefined && kv.values.length === kvu.valueChanges.length) {
        for (let i = 0; i < kv.values.length; i++) {
          kv.values[i] += kvu.valueChanges[i].effectiveValue;
        }
      }
    });
    this.newConditions.forEach((c) => {
      this.newConditions.push(
        Condition.createCondition(c.conditionType, c.conditionValues)
          .condition as CardCondition
      );
    });
    this.removeCondtionsOfType.forEach((ct) => {
      this.newConditions = this.newConditions.filter(
        (c) => c.conditionType !== ct
      );
    });
    keyword.isActive = this.isActive;
  }

  static fromJSON(json: any): KeywordUpgrade {
    const keywordType = json.keywordType as KeywordType;
    const keywordUpgradeIndex = json.keywordUpgradeIndex as number;
    const isPermanent = json.isPermanent as boolean;
    const durationChange = ModifiableInt.fromJSON(json.durationChange);
    const keywordValueUpgrades = json.keywordValueUpgrades.map((k: any) =>
      KeywordValueUpgrade.fromJSON(k)
    );
    const isActive = json.isActive as boolean;
    return new KeywordUpgrade(
      keywordType,
      keywordUpgradeIndex,
      isPermanent,
      durationChange,
      keywordValueUpgrades,
      isActive
    );
  }
}

export default KeywordUpgrade;
