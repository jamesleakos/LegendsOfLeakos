"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var TargetInfo = /** @class */ (function () {
    function TargetInfo(cardInstanceIdList, zoneInstanceIdList, targetsAreZones, noTargetWasSelected, targetsAreSelectedLater) {
        this.cardInstanceIdList = __spreadArray([], cardInstanceIdList, true);
        this.zoneInstanceIdList = __spreadArray([], zoneInstanceIdList, true);
        this.targetsAreZones = targetsAreZones;
        this.noTargetWasSelected = noTargetWasSelected;
        this.targetsAreSelectedLater = targetsAreSelectedLater;
    }
    return TargetInfo;
}());
exports.default = TargetInfo;
