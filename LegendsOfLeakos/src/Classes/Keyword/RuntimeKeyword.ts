class RuntimeKeyword {
  myEntityInstanceId: number;
  myEntity: AbilityKeywordRuntimeEntity;
  keywordType: KeywordType;
  indexForUpgrades?: number;
  description: string;
  isPermanent: boolean;
  duration: number;
  keywordValueList: KeywordValue[] = [];
  isActive: boolean;
  imageName: StringProperty = new StringProperty();

  // conditions for stat buffs
  conditions: Condition[] = [];

  setBaseData(
    myEntityId: number,
    keywordType: KeywordType,
    indexForUpgrades: number | null,
    description: string,
    isPermanent: boolean,
    duration: number,
    keywordValueList: KeywordValue[],
    isActive: boolean,
    conditions: Condition[],
    imageName: string
  ): void {
    this.myEntityInstanceId = myEntityId;
    this.keywordType = keywordType;
    this.indexForUpgrades = indexForUpgrades;
    this.description = description;
    this.isPermanent = isPermanent;
    this.duration = duration;
    this.isActive = isActive;

    for (const x of keywordValueList) {
      const tempIntList: number[] = [];
      for (const i of x.values) {
        tempIntList.push(i);
      }
      this.keywordValueList.push(
        new KeywordValue(x.keywordValueType, tempIntList)
      );
    }

    for (const c of conditions) {
      this.conditions.push(
        ConditionFactory.createCondition(
          c.conditionType,
          c.conditionValues
        ).getCondition()
      );
    }

    this.imageName.name = 'Image Name';
    this.imageName.value = imageName;
  }

  onEndTurn(): void {
    if (!this.isPermanent) {
      this.duration = this.duration - 1;
      if (this.duration <= 0) {
        this.myEntity.removeKeyword(this);
      }
    }
  }

  // This is for when we know we're just looking for one single value
  getKeywordValue(keywordValueType: KeywordValueType): number {
    return this.keywordValueList.find(
      (c) => c.keywordValueType === keywordValueType
    ).values[0];
  }

  // This is for when we know we're looking for a list
  getKeywordValues(keywordValueType: KeywordValueType): number[] {
    return this.keywordValueList.find(
      (c) => c.keywordValueType === keywordValueType
    ).values;
  }

  addStatBuff(
    stat: Stat,
    statCard: RuntimeCard,
    gameState: GameState
  ): StatBuff | null {
    return null;
  }

  preResolveEffect(
    myEnt: TargetableRuntimeEntity,
    e: Effect,
    sourceCard: RuntimeCard,
    gameState: GameState,
    targetInfoList: TargetInfo[]
  ): void {}
  postResolveEffect(
    myEnt: TargetableRuntimeEntity,
    e: Effect,
    sourceCard: RuntimeCard,
    gameState: GameState,
    targetInfoList: TargetInfo[]
  ): void {}
}

export default RuntimeKeyword;
