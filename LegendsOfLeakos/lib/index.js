"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Constants_1 = __importDefault(require("./Constants"));
// create and export a class called gamestate
var GameState = /** @class */ (function () {
    function GameState() {
        this.counter = 0;
    }
    // create a method called incrementCounter
    GameState.prototype.incrementCounter = function () {
        this.counter++;
    };
    return GameState;
}());
module.exports = {
    GameState: GameState,
    Constants: Constants_1.default
};
