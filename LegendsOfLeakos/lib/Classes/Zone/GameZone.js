"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameZoneType = void 0;
var GameZoneType = /** @class */ (function () {
    function GameZoneType(name, zoneEnum, owner, type, ownerVisibility, opponentVisibility, hasMaxSize, maxSize) {
        this.name = name;
        this.zoneEnum = zoneEnum;
        this.owner = owner;
        this.type = type;
        this.ownerVisibility = ownerVisibility;
        this.opponentVisibility = opponentVisibility;
        this.hasMaxSize = hasMaxSize;
        this.maxSize = maxSize;
    }
    return GameZoneType;
}());
exports.GameZoneType = GameZoneType;
