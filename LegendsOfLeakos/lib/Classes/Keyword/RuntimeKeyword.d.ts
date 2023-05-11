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
type KeywordFactoryPackage = {
    keyword: RuntimeKeyword;
    wasSuccessful: boolean;
    message: string;
};
declare class RuntimeKeyword {
    myEntityInstanceId: number;
    myEntity: AbilityKeywordRuntimeEntity;
    keywordType: KeywordType;
    indexForUpgrades?: number;
    description: string;
    isPermanent: boolean;
    duration: number;
    keywordValueList: KeywordValue[];
    isActive: boolean;
    imageName: string;
    conditions: Condition[];
    setBaseData(myEntityId: number, keywordType: KeywordType, indexForUpgrades: number | null, description: string, isPermanent: boolean, duration: number, keywordValueList: KeywordValue[], isActive: boolean, conditions: Condition[], imageName: string): void;
    onEndTurn(): void;
    getKeywordValue(keywordValueType: KeywordValueType): number;
    getKeywordValues(keywordValueType: KeywordValueType): number[];
    addStatBuff(stat: Stat, statCard: RuntimeCard, gameState: GameState): StatBuff | null;
    preResolveEffect(myEnt: TargetableRuntimeEntity, e: Effect, sourceCard: RuntimeCard, gameState: GameState, targetInfoList: TargetInfo[]): void;
    postResolveEffect(myEnt: TargetableRuntimeEntity, e: Effect, sourceCard: RuntimeCard, gameState: GameState, targetInfoList: TargetInfo[]): void;
    static createRuntimeKeyword(myEntityId: number, keywordType: KeywordType, indexForUpgrades: number | null, setDescription: string, isPermanent: boolean, setDuration: number, keywordValueList: KeywordValue[], isActive: boolean, conditions: Condition[], imageName: string): KeywordFactoryPackage;
}
export default RuntimeKeyword;
