import GameState from '../Game/GameState';
import EffectSolver from '../Game/EffectSolver';
import Queueline from '../Queueline/Queueline';
import ServerHandler from './ServerHandler';
import Phase from '../Phase/Phase';
import GameManager from '../Game/GameManager';

class Server {
  // #region Properties

  // Assuming that Phase, GameState, EffectSolver, ServerHandler, and Queueline are already defined elsewhere in your TypeScript code.

  // Phase Variables
  p0_readyToProgressPhase: boolean;
  p1_readyToProgressPhase: boolean;

  currentPhaseIndex: number;
  phaseList: Phase[];

  // Turn Variables
  turnCoroutine: any;

  turnDuration: number;

  public currentTurn: number;

  // References to Major Classes and Systems
  public gameState: GameState;

  protected _effectSolver: EffectSolver;
  public get effectSolver(): EffectSolver {
    return this._effectSolver;
  }
  protected set effectSolver(value: EffectSolver) {
    this._effectSolver = value;
  }

  protected handlers: ServerHandler[] = [];

  // Queue Variables
  public currentQueueIndex: number;
  protected queue: Queueline[] = [];
  public targetInfoCode: number | null;

  protected gameFinished: boolean;

  // #endregion

  // #region One Use Functions
  // Called when the server starts listening.
  public onStartServer(gameManager: GameManager): void {
    this.loadGameConfiguration(gameManager);
    this.addServerHandlers();
    this.registerServerHandlers();
  }

  // Loads the game configuration.
  protected loadGameConfiguration(gameManager: GameManager): void {
    let gameConfig = gameManager.gameProperties;
    this.turnDuration = gameConfig.properties.turnDuration;
    this.phaseList = gameConfig.gamePhases;
  }

  // Adds the server handlers that are actually responsible for implementing the server's logic.
  protected addServerHandlers(): void {
    // this.handlers.push(new PlayerRegistrationHandler(this));
    // this.handlers.push(new TurnSequenceHandler(this));
    // this.handlers.push(new EffectSolverHandler(this));
    // this.handlers.push(new ChatHandler(this));
    // this.handlers.push(new PlayerActionHandler(this));
    // this.handlers.push(new CombatHandler(this));
  }

  // Registers the network handlers for the messages the server is interested in listening to.
  protected registerServerHandlers(): void {
    for (let handler of this.handlers) {
      handler.registerNetworkHandlers();
    }
  }

  // Unregisters the network handlers for the messages the server is interested in listening to.
  protected unregisterServerHandlers(): void {
    for (let handler of this.handlers) {
      handler.unregisterNetworkHandlers();
    }
    this.handlers = [];
  }

  // This function is called when the NetworkBehaviour will be destroyed.
  protected onDestroy(): void {
    this.unregisterServerHandlers();
  }

  // Called when a player with the specified connection identifier connects to the server.
  public onPlayerConnected(connectionId: number): void {
    console.log('Player with id ' + connectionId + ' connected to server.');
    /*var player = Players.find(x => x.ConnectionId === connectionId);
  if (player !== null)
      player.IsConnected = true;*/
  }

  // Called when a player with the specified connection identifier disconnects from the server.
  public onPlayerDisconnected(connectionId: number): void {
    console.log(
      'Player with id ' + connectionId + ' disconnected from server.'
    );
    /*var player = Players.find(x => x.ConnectionId === connectionId);
  if (player !== null)
      player.IsConnected = false;*/
  }

  // #endregion

  // #region Other Helpers

  // #endregion

  // #region Game Loop

  // #region State and End

  // #endregion

  // #region Phase Flow

  // #endregion

  // #endregion

  // #region Executing the Queue

  // #endregion

  // #region Utility Functions

  // #endregion
}

export default Server;
