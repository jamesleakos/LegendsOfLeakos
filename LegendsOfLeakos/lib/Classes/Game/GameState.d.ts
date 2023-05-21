import GameManager from './GameManager';
import EffectSolver from './EffectSolver';
import RuntimeCard from '../Card/RuntimeCard';
import PlayerInfo from '../Player/PlayerInfo';
import RuntimeZone from '../Zone/RuntimeZone';
import TargetableRuntimeEntity from '../Entity/TargetableRuntimeEntity';
declare class GameState {
    gameManager: GameManager;
    players: PlayerInfo[];
    effectSolver: EffectSolver;
    currentTurn: number;
    constructor(gameManager: GameManager, players: PlayerInfo[], effectSolver: EffectSolver);
    getCardFromAnywhere(cardInstanceId: number): RuntimeCard | null;
    getZone(zoneInstanceId: number): RuntimeZone | null;
    getEntityFromAnywhere(instanceId: number): TargetableRuntimeEntity | null;
}
export default GameState;
