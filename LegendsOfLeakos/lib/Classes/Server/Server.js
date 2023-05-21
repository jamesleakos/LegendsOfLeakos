"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Server = /** @class */ (function () {
    function Server() {
        // #region Properties
        this.handlers = [];
        this.queue = [];
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
    Object.defineProperty(Server.prototype, "effectSolver", {
        get: function () {
            return this._effectSolver;
        },
        set: function (value) {
            this._effectSolver = value;
        },
        enumerable: false,
        configurable: true
    });
    // #endregion
    // #region One Use Functions
    // Called when the server starts listening.
    Server.prototype.onStartServer = function (gameManager) {
        this.loadGameConfiguration(gameManager);
        this.addServerHandlers();
        this.registerServerHandlers();
    };
    // Loads the game configuration.
    Server.prototype.loadGameConfiguration = function (gameManager) {
        var gameConfig = gameManager.gameProperties;
        this.turnDuration = gameConfig.properties.turnDuration;
        this.phaseList = gameConfig.gamePhases;
    };
    // Adds the server handlers that are actually responsible for implementing the server's logic.
    Server.prototype.addServerHandlers = function () {
        // this.handlers.push(new PlayerRegistrationHandler(this));
        // this.handlers.push(new TurnSequenceHandler(this));
        // this.handlers.push(new EffectSolverHandler(this));
        // this.handlers.push(new ChatHandler(this));
        // this.handlers.push(new PlayerActionHandler(this));
        // this.handlers.push(new CombatHandler(this));
    };
    // Registers the network handlers for the messages the server is interested in listening to.
    Server.prototype.registerServerHandlers = function () {
        for (var _i = 0, _a = this.handlers; _i < _a.length; _i++) {
            var handler = _a[_i];
            handler.registerNetworkHandlers();
        }
    };
    // Unregisters the network handlers for the messages the server is interested in listening to.
    Server.prototype.unregisterServerHandlers = function () {
        for (var _i = 0, _a = this.handlers; _i < _a.length; _i++) {
            var handler = _a[_i];
            handler.unregisterNetworkHandlers();
        }
        this.handlers = [];
    };
    // This function is called when the NetworkBehaviour will be destroyed.
    Server.prototype.onDestroy = function () {
        this.unregisterServerHandlers();
    };
    // Called when a player with the specified connection identifier connects to the server.
    Server.prototype.onPlayerConnected = function (connectionId) {
        console.log('Player with id ' + connectionId + ' connected to server.');
        /*var player = Players.find(x => x.ConnectionId === connectionId);
      if (player !== null)
          player.IsConnected = true;*/
    };
    // Called when a player with the specified connection identifier disconnects from the server.
    Server.prototype.onPlayerDisconnected = function (connectionId) {
        console.log('Player with id ' + connectionId + ' disconnected from server.');
        /*var player = Players.find(x => x.ConnectionId === connectionId);
      if (player !== null)
          player.IsConnected = false;*/
    };
    return Server;
}());
exports.default = Server;
