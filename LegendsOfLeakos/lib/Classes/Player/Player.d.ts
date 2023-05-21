import GameState from '../Game/GameState';
import PlayerInfo from './PlayerInfo';
import PlayerQueueline from '../Queueline/PlayerQueueline';
import ServerRequestsTargetsPlayerQueueline from '../Queueline/PlayerQueuelines/ServerRequestsTargetsPlayerQueueline';
import Phase from '../Phase/Phase';
import TargetInfo from '../Target/TargetInfo';
import EffectSolver from '../Game/EffectSolver';
import RuntimeZone from '../Zone/RuntimeZone';
import Effect from '../Effect/Effect';
import PayResourceCost from '../PayResourceCost/PayResourceCost';
declare enum AbilityTrackingMode {
    None = 0,
    Activated = 1,
    Battlecry = 2,
    Upgrade = 3,
    ReturningRequestedTargetInfo = 4
}
declare class Player {
    isHuman: boolean;
    client: any;
    gameStarted: boolean;
    playerIndex: number;
    turnDuration: number;
    effectSolver: EffectSolver;
    gameState: GameState;
    playerInfo: PlayerInfo;
    opponentInfo: PlayerInfo;
    queue: PlayerQueueline[];
    requestLine: ServerRequestsTargetsPlayerQueueline;
    masterState: GameState;
    savedStates: GameState[];
    savedQueueStates: PlayerQueueline[][];
    queueReadyToRun: boolean;
    currentQueueIndex: number;
    numQueuelinesInBatch: number;
    numQueuelinesTotal: number;
    numQueuelinesAlreadyProcessed: number;
    breakingBeforeEndOfQueue: boolean;
    amBreakingPlayer: boolean;
    currentPhaseIndex: number;
    phaseList: Phase[];
    currentTurn: number;
    serverReadyForNextPhase: boolean;
    tempNextPhasePlayerInfoFromServer: PlayerInfo;
    tempNextPhaseOpponentInfoFromServer: PlayerInfo;
    abilityTrackingMode: AbilityTrackingMode;
    currentCardInstanceId: number;
    currentTrackingIndex: number;
    currentEffect: Effect;
    currentBoardToPlayCardOn: RuntimeZone;
    currentTargetInfo: TargetInfo;
    currentTargetInfoCardList: number[];
    currentTargetInfoZoneList: number[];
    currentTargetInfoList: TargetInfo[];
    targetInfoCode: number;
    manaBreakdown: PayResourceCost[];
}
export default Player;
