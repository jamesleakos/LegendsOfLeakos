"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseLandTile_1 = __importDefault(require("./BaseLandTile"));
// import { LandType } from '../../../Enums/LandAndBiome';
var RuntimeLandTile = /** @class */ (function (_super) {
    __extends(RuntimeLandTile, _super);
    function RuntimeLandTile() {
        // TODO - add player info
        // public playerInfo: PlayerInfo | null = null;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // public neighbors: RuntimeLandTile[] = []; // inherited from BaseLandTile
        _this.onDepthChanged = [];
        _this.onTypeChanged = [];
        _this.onExploredChanged = [];
        return _this;
    }
    RuntimeLandTile.prototype.explore = function (setExplored) {
        if (this.explored !== setExplored) {
            this.explored = setExplored;
            this.onExploredChanged.forEach(function (callback) { return callback(setExplored); });
        }
    };
    RuntimeLandTile.prototype.anyNeighborExplored = function () {
        return this.neighbors.some(function (neighbor) { return neighbor.explored; });
    };
    return RuntimeLandTile;
}(BaseLandTile_1.default));
exports.default = RuntimeLandTile;
