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
var Effect_1 = __importDefault(require("../../Effect"));
var RuntimeCard_1 = __importDefault(require("../../../Card/RuntimeCard"));
var MoveCardEffect = /** @class */ (function (_super) {
    __extends(MoveCardEffect, _super);
    function MoveCardEffect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Effect Creation Static Vars
    // variables and methods to help with the creation of these effects by a person in the card creator
    MoveCardEffect.prototype.myRequiredEffectValues = function () {
        var tempList = [];
        for (var _i = 0, _a = _super.prototype.myRequiredEffectValues.call(this); _i < _a.length; _i++) {
            var x = _a[_i];
            tempList.push(x);
        }
        return tempList;
    };
    MoveCardEffect.prototype.numberOfTargetTypes = function () {
        return 0;
    };
    MoveCardEffect.prototype.targetTypeInfoList = function () {
        var list = [];
        return list;
    };
    // Effect To Text
    MoveCardEffect.prototype.effectToString = function () {
        var outText = 'Move this card from ' +
            this.originZoneEnum +
            ' to ' +
            this.destinationZoneEnum +
            '. ';
        return outText;
    };
    MoveCardEffect.prototype.preEffect = function (state, sourceEntity, targetInfoList) {
        if (sourceEntity.residingZone.zoneEnum !== this.originZoneEnum)
            return false;
        return true;
    };
    MoveCardEffect.prototype.resolve = function (state, sourceEntity, targetInfoList) {
        var _this = this;
        // shouldn't be trying to move a non-card
        if (!(sourceEntity instanceof RuntimeCard_1.default))
            throw new Error('Why is non card entity attacking?');
        var sourceCard = sourceEntity;
        var player = sourceCard.ownerPlayer;
        // make sure it's still where it thinks it is
        if (sourceCard.residingZone.zoneEnum !== this.originZoneEnum) {
            console.log('Returning out of resolve');
            return;
        }
        var originZone = player.zones.find(function (c) { return c.zoneEnum === _this.originZoneEnum; });
        var destinationZone = player.zones.find(function (c) { return c.zoneEnum === _this.destinationZoneEnum; });
        originZone.removeCard(sourceCard);
        destinationZone.addCard(sourceCard);
    };
    MoveCardEffect.prototype.areTargetsAvailable = function (state, sourceEntity, targetTypes) {
        return true;
    };
    MoveCardEffect.prototype.isTargetInfoStillValid = function (sourceEntity, state, targetInfo, targetType) {
        return true;
    };
    MoveCardEffect.prototype.areAllSelectedTargetInfoItemsValid = function (sourceEntity, state, targetInfoList, targetTypes) {
        return true;
    };
    return MoveCardEffect;
}(Effect_1.default));
exports.default = MoveCardEffect;
