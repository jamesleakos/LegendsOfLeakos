"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServerHandler = /** @class */ (function () {
    // Constructor.
    function ServerHandler(server) {
        this.server = server;
    }
    // This method is where subclasses should register to receive the network messages they are interested in.
    ServerHandler.prototype.registerNetworkHandlers = function () {
        // Override this method in subclasses.
    };
    // This method is where subclasses should unregister to stop receiving the network messages they are interested in.
    ServerHandler.prototype.unregisterNetworkHandlers = function () {
        // Override this method in subclasses.
    };
    ServerHandler.prototype.onStartRecruitmentPhase = function () {
        // Override this method in subclasses.
    };
    ServerHandler.prototype.onEndRecruitmentPhase = function () {
        // Override this method in subclasses.
    };
    ServerHandler.prototype.onStartManeuverPhase = function () {
        // Override this method in subclasses.
    };
    ServerHandler.prototype.onEndManeuverPhase = function () {
        // Override this method in subclasses.
    };
    ServerHandler.prototype.onStartSkirmishPhase = function () {
        // Override this method in subclasses.
    };
    ServerHandler.prototype.onEndSkirmishPhase = function () {
        // Override this method in subclasses.
    };
    ServerHandler.prototype.onStartBattlePhase = function () {
        // Override this method in subclasses.
    };
    ServerHandler.prototype.onEndBattlePhase = function () {
        // Override this method in subclasses.
    };
    return ServerHandler;
}());
exports.default = ServerHandler;
