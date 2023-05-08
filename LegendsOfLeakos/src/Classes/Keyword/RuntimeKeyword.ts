import { KeywordType, KeywordValueType } from '../../Enums/Keyword';
import AbilityKeywordRuntimeEntity from '../Entity/AbilityKeywordRuntimeEntity';
import KeywordValue from './KeywordValue';
import { Condition } from '../Condition/Condition';
import Stat from '../Stat/Stat';
import RuntimeCard from '../Card/RuntimeCard';
import GameState from '../Game/GameState';
import TargetableRuntimeEntity from '../Entity/TargetableRuntimeEntity';
import Effect from '../Effect/Effect';
import TargetInfo from '../Target/TargetInfo';
import StatBuff from '../Stat/StatBuff';

// child keywords
import MeekKeyword from './Keywords/SimpleKeywords/MeekKeyword';
import ImpetusKeyword from './Keywords/SimpleKeywords/ImpetusKeyword';
import ProvokeKeyword from './Keywords/SimpleKeywords/ProvokeKeyword';
import SkirmisherKeyword from './Keywords/SimpleKeywords/SkirmisherKeyword';
import OverkillKeyword from './Keywords/SimpleKeywords/OverkillKeyword';
import DivineShieldKeyword from './Keywords/EffectModification/DivineShieldKeyword';
import ShieldedKeyword from './Keywords/EffectModification/ShieldedKeyword';
import WarleaderKeyword from './Keywords/StatModification/WarleaderKeyword';

type KeywordFactoryPackage = {
  keyword: RuntimeKeyword;
  wasSuccessful: boolean;
  message: string;
};

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
  imageName: string;

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
        Condition.createCondition(c.conditionType, c.conditionValues).condition
      );
    }

    this.imageName = imageName;
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

  static createRuntimeKeyword(
    myEntityId: number,
    keywordType: KeywordType,
    indexForUpgrades: number | null,
    setDescription: string,
    isPermanent: boolean,
    setDuration: number,
    keywordValueList: KeywordValue[],
    isActive: boolean,
    conditions: Condition[],
    imageName: string
  ): KeywordFactoryPackage {
    let outKeyword: RuntimeKeyword | null = null;
    if (keywordType === KeywordType.Meek) {
      if (setDescription === '')
        setDescription = 'This unit does not prevent attacks into the back row';
      outKeyword = new MeekKeyword(
        myEntityId,
        keywordType,
        indexForUpgrades,
        setDescription,
        isPermanent,
        setDuration,
        keywordValueList,
        isActive,
        conditions,
        imageName
      );
    }
    if (keywordType === KeywordType.Impetus) {
      if (setDescription === '')
        setDescription = 'This unit can move and attack in the same turn';
      outKeyword = new ImpetusKeyword(
        myEntityId,
        keywordType,
        indexForUpgrades,
        setDescription,
        isPermanent,
        setDuration,
        keywordValueList,
        isActive,
        conditions,
        imageName
      );
    }
    if (keywordType === KeywordType.Provoke) {
      if (setDescription === '')
        setDescription = "I'm not sure what provoke is";
      outKeyword = new ProvokeKeyword(
        myEntityId,
        keywordType,
        indexForUpgrades,
        setDescription,
        isPermanent,
        setDuration,
        keywordValueList,
        isActive,
        conditions,
        imageName
      );
    }
    if (keywordType === KeywordType.Skirmisher) {
      if (setDescription === '')
        setDescription = 'This unit can move and attack in the same turn';
      outKeyword = new SkirmisherKeyword(
        myEntityId,
        keywordType,
        indexForUpgrades,
        setDescription,
        isPermanent,
        setDuration,
        keywordValueList,
        isActive,
        conditions,
        imageName
      );
    }
    if (keywordType === KeywordType.DivineShield) {
      if (setDescription === '')
        setDescription = 'When this unit takes damage, prevent it.';
      outKeyword = new DivineShieldKeyword(
        myEntityId,
        keywordType,
        indexForUpgrades,
        setDescription,
        isPermanent,
        setDuration,
        keywordValueList,
        isActive,
        conditions,
        imageName
      );
    }
    if (keywordType === KeywordType.Shielded) {
      if (setDescription === '')
        setDescription = 'Reduce damage that this unit takes by some amount';
      outKeyword = new ShieldedKeyword(
        myEntityId,
        keywordType,
        indexForUpgrades,
        setDescription,
        isPermanent,
        setDuration,
        keywordValueList,
        isActive,
        conditions,
        imageName
      );
    }
    if (keywordType === KeywordType.Overkill) {
      if (setDescription === '')
        setDescription =
          "Damage in excess of blocker's health carries on to the next blocker or blocked unit";
      outKeyword = new OverkillKeyword(
        myEntityId,
        keywordType,
        indexForUpgrades,
        setDescription,
        isPermanent,
        setDuration,
        keywordValueList,
        isActive,
        conditions,
        imageName
      );
    }
    if (keywordType === KeywordType.Warleader) {
      if (setDescription === '')
        setDescription =
          'This keyword buffs conditional card stats some set scalar amount';
      outKeyword = new WarleaderKeyword(
        myEntityId,
        keywordType,
        indexForUpgrades,
        setDescription,
        isPermanent,
        setDuration,
        keywordValueList,
        isActive,
        conditions,
        imageName
      );
    }

    // here we check for possible errors and possible bad passes of effectValueList and TargetTypes

    let success = true;
    let message = 'Keyword created successfully';

    if (outKeyword === null) {
      success = false;
      message = 'Keyword was not created. Check if KeywordType was correct';
    }
    return {
      keyword: outKeyword,
      wasSuccessful: success,
      message: message,
    };
  }
}

export default RuntimeKeyword;
