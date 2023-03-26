"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Constants_1 = __importDefault(require("./Constants"));
var GameServer = /** @class */ (function () {
    function GameServer(room, sendToRoom, sendToPlayer, endGameCallback) {
        this.room = room;
        this.sendToRoom = sendToRoom;
        this.sendToPlayer = sendToPlayer;
        this.endGameCallback = endGameCallback;
    }
    GameServer.prototype.startNewGame = function () {
        console.log("Starting new game");
    };
    GameServer.prototype.endGame = function () {
        console.log("Ending game");
        this.endGameCallback('game statistics go here');
    };
    GameServer.prototype.listen = function (playerSockets) {
        var game = this;
        var _loop_1 = function (socket) {
            socket.on('client-message', function (data) {
                game.test(socket, data);
            });
            socket.on('end-game', function (data) {
                game.endGame();
            });
        };
        for (var _i = 0, playerSockets_1 = playerSockets; _i < playerSockets_1.length; _i++) {
            var socket = playerSockets_1[_i];
            _loop_1(socket);
        }
    };
    GameServer.prototype.unlisten = function (playerSockets) {
        for (var _i = 0, playerSockets_2 = playerSockets; _i < playerSockets_2.length; _i++) {
            var socket = playerSockets_2[_i];
            socket.removeAllListeners('client-message');
            socket.removeAllListeners('end-game');
        }
    };
    GameServer.prototype.test = function (playerSocket, data) {
        console.log('GameServer: returning message');
        this.sendToRoom('server-message', 'Hello from server');
    };
    return GameServer;
}());
module.exports = {
    Constants: Constants_1.default,
    GameServer: GameServer
};
