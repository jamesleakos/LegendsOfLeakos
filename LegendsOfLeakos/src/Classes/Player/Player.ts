import GameState from '../Game/GameState';
import PlayerInfo from './PlayerInfo';
import PlayerQueueline from './PlayerQueueline';
import ServerRequestsTargetsPlayerQueueline from './ServerRequestsTargetsPlayerQueueline';
import Phase from '../Phase/Phase';
import TargetInfo from '../Target/TargetInfo';
import EffectSolver from '../Game/EffectSolver';
import RuntimeZone from '../Zone/RuntimeZone';
import Effect from '../Effect/Effect';
import PayResourceCost from '../PayResourceCost/PayResourceCost';

enum AbilityTrackingMode {
  None,
  Activated,
  Battlecry,
  Upgrade,
  ReturningRequestedTargetInfo,
}

class Player {
  // #region Properties

  // Game / Player Info
  isHuman: boolean; // True if this player is controlled by a human; false otherwise (AI).
  // TODO - add client when i have that
  client: any; // Cached network client.
  gameStarted: boolean; // True if the game has started; false otherwise.
  playerIndex: number; // Index of this player in the game.
  turnDuration: number; // This game's turn duration (in seconds).
  effectSolver: EffectSolver;

  // Queue and Gamestate tracking
  gameState: GameState; // The currently loaded gamestate. Master state will hold a reference to the server version
  playerInfo: PlayerInfo = new PlayerInfo();
  opponentInfo: PlayerInfo = new PlayerInfo();
  queue: PlayerQueueline[] = []; // an event queue for events that the server sends
  requestLine: ServerRequestsTargetsPlayerQueueline;
  masterState: GameState; // this will hold a reference to teh current game state - as gamestate may get overwritten during a queue review
  savedStates: GameState[] = [];
  savedQueueStates: PlayerQueueline[][] = [];
  queueReadyToRun: boolean;
  currentQueueIndex: number; // where we are in the queue
  numQueuelinesInBatch: number; // the number of actions that we are expecting from the server in this batch - asking for targets doesn't count
  numQueuelinesTotal: number; // the number of actions that we are expecting total - asking for targets doesn't count
  numQueuelinesAlreadyProcessed: number;
  breakingBeforeEndOfQueue: boolean; // whether we will break before the end of the queue
  amBreakingPlayer: boolean; // aam I the breaking player

  // Phase and Turn Tracking
  currentPhaseIndex: number;
  phaseList: Phase[];
  currentTurn: number;
  serverReadyForNextPhase: boolean;
  tempNextPhasePlayerInfoFromServer: PlayerInfo;
  tempNextPhaseOpponentInfoFromServer: PlayerInfo;

  // Activated Ability, Battlecry Ability, and Upgrade Variables
  abilityTrackingMode: AbilityTrackingMode;
  currentCardInstanceId: number;
  currentTrackingIndex: number;
  currentEffect: Effect;
  // this may need work
  currentBoardToPlayCardOn: RuntimeZone;
  currentTargetInfo: TargetInfo; // working vars
  currentTargetInfoCardList: number[] = [];
  currentTargetInfoZoneList: number[] = [];
  currentTargetInfoList: TargetInfo[] = [];
  targetInfoCode: number;

  manaBreakdown: PayResourceCost[] = [];

  // #endregion
}

export default Player;
