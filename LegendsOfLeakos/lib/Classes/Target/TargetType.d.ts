import { TargetTypeEnum, TargetableTypeSelectionEnum } from '../../Enums/Target';
import { Condition } from '../Condition/Condition';
import PlayerInfo from '../Player/PlayerInfo';
import RuntimeCard from '../Card/RuntimeCard';
import GameState from '../Game/GameState';
import TargetInfo from './TargetInfo';
import RuntimeZone from '../Zone/RuntimeZone';
declare class TargetType {
    name: string;
    targetTypeEnum: TargetTypeEnum;
    targetableTypeSelectionEnum: TargetableTypeSelectionEnum;
    minSelectionsRequired: number;
    maxSelectionsAllowed: number;
    minSelectionsThatMustRemain: number;
    conditions: Array<Condition>;
    playerSelectsTarget: boolean;
    constructor(name: string, targetTypeEnum: TargetTypeEnum, minSelectionsRequired: number, maxSelectionsAllowed: number, minSelectionsThatMustRemain: number, targetableTypeSelectionEnum: TargetableTypeSelectionEnum, conditions: Array<Condition>);
    getTargetTypeEnum(): TargetTypeEnum;
    autoSelectTargetInfo(sourcePlayer: PlayerInfo, sourceCard: RuntimeCard, gameState: GameState): TargetInfo;
    cardSatisfiesConditions(sourceCard: RuntimeCard): boolean;
    zoneSatisfiesConditions(zone: RuntimeZone): boolean;
    static getFightTargetType(): TargetType;
    static fromJSON(targetTypeJSON: any): TargetType;
}
export default TargetType;
