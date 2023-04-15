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
var LibraryLandTile = /** @class */ (function (_super) {
    __extends(LibraryLandTile, _super);
    function LibraryLandTile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // this is all in BASELANDTILE
    // public id: number;
    // public x: number;
    // public y: number;
    // public z: number;
    // public depth: number;
    // public landType: number;
    //#region FACTORY AND COPY
    LibraryLandTile.libraryLandTileFactory = function (id, x, y, z, depth, landType) {
        var tempTile = new LibraryLandTile();
        tempTile.id = id;
        tempTile.x = x;
        tempTile.y = y;
        tempTile.z = z;
        tempTile.depth = depth;
        tempTile.landType = landType;
        return tempTile;
    };
    LibraryLandTile.copyLandTile = function (oldEntry) {
        return LibraryLandTile.libraryLandTileFactory(oldEntry.id, oldEntry.x, oldEntry.y, oldEntry.z, oldEntry.depth, oldEntry.landType);
    };
    //#endregion
    //#region JSON
    LibraryLandTile.prototype.toJSON = function () {
        return {
            id: this.id,
            x: this.x,
            y: this.y,
            z: this.z,
            depth: this.depth,
            landType: this.landType,
        };
    };
    //#endregion
    //#region OTHER UTILITIES
    LibraryLandTile.prototype.mostCommonNeighborType = function () {
        var typeCounts = {};
        for (var _i = 0, _a = this.neighbors; _i < _a.length; _i++) {
            var neighbor = _a[_i];
            if (neighbor.landType in typeCounts) {
                typeCounts[neighbor.landType.toString()] += 1;
            }
            else {
                typeCounts[neighbor.landType.toString()] = 1;
            }
        }
        var mostCommonType = 0;
        var mostCommonCount = 0;
        for (var type in typeCounts) {
            if (typeCounts[type] > mostCommonCount) {
                mostCommonType = parseInt(type);
                mostCommonCount = typeCounts[type];
            }
        }
        return mostCommonType;
    };
    LibraryLandTile.fromJSON = function (json) {
        return LibraryLandTile.libraryLandTileFactory(json.id, json.x, json.y, json.z, json.depth, json.landType);
    };
    return LibraryLandTile;
}(BaseLandTile_1.default));
exports.default = LibraryLandTile;
