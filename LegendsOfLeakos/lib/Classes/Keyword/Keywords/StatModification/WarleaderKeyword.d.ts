import RuntimeKeyword from '../../RuntimeKeyword';
import Stat from '../../../Stat/Stat';
import StatBuff from '../../../Stat/StatBuff';
import RuntimeCard from '../../../Card/RuntimeCard';
import GameState from '../../../Game/GameState';
import KeywordValue from '../../KeywordValue';
import { KeywordType } from '../../../../Enums/Keyword';
import { Condition } from '../../../Condition/Condition';
export declare class WarleaderKeyword extends RuntimeKeyword {
    constructor(setMyEntityId: number, keywordType: KeywordType, indexForUpgrades: number | null, setDescription: string, setIsPermanent: boolean, setDuration: number, keywordValueList: KeywordValue[], isActive: boolean, conditions: Condition[], imageName: string);
    addStatBuff(stat: Stat, statCard: RuntimeCard, gameState: GameState): StatBuff | null;
}
export default WarleaderKeyword;
