"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var PlayerInfo_1 = __importDefault(require("./PlayerInfo"));
var AbilityTrackingMode;
(function (AbilityTrackingMode) {
    AbilityTrackingMode[AbilityTrackingMode["None"] = 0] = "None";
    AbilityTrackingMode[AbilityTrackingMode["Activated"] = 1] = "Activated";
    AbilityTrackingMode[AbilityTrackingMode["Battlecry"] = 2] = "Battlecry";
    AbilityTrackingMode[AbilityTrackingMode["Upgrade"] = 3] = "Upgrade";
    AbilityTrackingMode[AbilityTrackingMode["ReturningRequestedTargetInfo"] = 4] = "ReturningRequestedTargetInfo";
})(AbilityTrackingMode || (AbilityTrackingMode = {}));
var Player = /** @class */ (function () {
    function Player() {
        // #region Properties
        this.playerInfo = new PlayerInfo_1.default();
        this.opponentInfo = new PlayerInfo_1.default();
        this.queue = []; // an event queue for events that the server sends
        this.savedStates = [];
        this.savedQueueStates = [];
        this.currentTargetInfoCardList = [];
        this.currentTargetInfoZoneList = [];
        this.currentTargetInfoList = [];
        this.manaBreakdown = [];
        // #endregion
    }
    return Player;
}());
exports.default = Player;
