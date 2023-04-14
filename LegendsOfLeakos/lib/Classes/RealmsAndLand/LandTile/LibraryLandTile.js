"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LibraryLandTile = /** @class */ (function () {
    function LibraryLandTile(id, x, y, z, depth, landType) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.z = z;
        this.depth = depth;
        this.landType = landType;
    }
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
    LibraryLandTile.getRealmEntryFromLandTile = function (landTile) {
        var tempTile = new LibraryLandTile(landTile.id, landTile.x, landTile.y, landTile.z, landTile.depth, landTile.landType);
        return tempTile;
    };
    LibraryLandTile.copyLandTile = function (oldEntry) {
        return new LibraryLandTile(oldEntry.id, oldEntry.x, oldEntry.y, oldEntry.z, oldEntry.depth, oldEntry.landType);
    };
    LibraryLandTile.fromJSON = function (json) {
        return new LibraryLandTile(json.id, json.x, json.y, json.z, json.depth, json.landType);
    };
    return LibraryLandTile;
}());
exports.default = LibraryLandTile;
