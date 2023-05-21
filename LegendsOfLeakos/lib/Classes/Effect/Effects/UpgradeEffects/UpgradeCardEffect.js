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
var UpgradeCardEffect = /** @class */ (function (_super) {
    __extends(UpgradeCardEffect, _super);
    function UpgradeCardEffect(upgradeLevel) {
        var _this = _super.call(this) || this;
        _this.upgradeIndex = upgradeLevel;
        return _this;
    }
    UpgradeCardEffect.prototype.myRequiredEffectValues = function () {
        var tempList = [];
        tempList = tempList.concat(_super.prototype.myRequiredEffectValues.call(this));
        return tempList;
    };
    UpgradeCardEffect.prototype.numberOfTargetTypes = function () {
        return 0;
    };
    UpgradeCardEffect.prototype.targetTypeInfoList = function () {
        var list = [];
        return list;
    };
    UpgradeCardEffect.prototype.effectToString = function () {
        var outText = "Upgrade this card to upgrade with index ".concat(this.upgradeIndex.toString());
        return outText;
    };
    UpgradeCardEffect.prototype.preEffect = function (state, sourceEntity, targetInfoList) {
        return true;
    };
    UpgradeCardEffect.prototype.resolve = function (state, sourceEntity, targetInfoList) {
        var _this = this;
        if (!(sourceEntity instanceof RuntimeCard_1.default)) {
            throw new Error('Why is non card entity attacking?');
        }
        var sourceCard = sourceEntity;
        var libraryCard = state.gameManager.getCardFromLibraryId(sourceCard.libraryId);
        var upgrade = libraryCard.cardUpgrades.find(function (x) { return x.upgradeIndex === _this.upgradeIndex; });
        upgrade.upgradeCard(sourceCard);
    };
    UpgradeCardEffect.prototype.areTargetsAvailable = function (state, sourceEntity, targetTypes) {
        return true;
    };
    UpgradeCardEffect.prototype.areAllSelectedTargetInfoItemsValid = function (sourceEntity, state, targetInfoList, targetTypes) {
        return true;
    };
    UpgradeCardEffect.prototype.isTargetInfoStillValid = function (sourceEntity, state, targetInfo, targetType) {
        return true;
    };
    return UpgradeCardEffect;
}(Effect_1.default));
exports.default = UpgradeCardEffect;
