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
var GiveKeywordBaseEffect_1 = __importDefault(require("./GiveKeywordBaseEffect"));
var Effect_1 = require("../../../../Enums/Effect");
var TargetTypeInfo_1 = __importDefault(require("../../../Target/TargetTypeInfo"));
var Keyword_1 = require("../../../../Enums/Keyword");
var KeywordValue_1 = __importDefault(require("../../../Keyword/KeywordValue"));
var EffectValueCreatorInfo_1 = __importDefault(require("../../EffectValueCreatorInfo"));
var GiveShieldedKeywordEffect = /** @class */ (function (_super) {
    __extends(GiveShieldedKeywordEffect, _super);
    function GiveShieldedKeywordEffect(setEffectValues, setTargetTypes) {
        var _this = _super.call(this) || this;
        _this.effectEnum = Effect_1.EffectType.GiveShieldedKeyword;
        _this.setEffectValueList(setEffectValues);
        _this.setTargetTypeList(setTargetTypes);
        return _this;
    }
    // Effect Creation Static Vars
    // variables and methods to help with the creation of these effects by a person in the card creator
    GiveShieldedKeywordEffect.prototype.myRequiredEffectValues = function () {
        var tempList = [
            new EffectValueCreatorInfo_1.default(Effect_1.EffectValueType.ShieldedKeywordShieldAmount, true),
            new EffectValueCreatorInfo_1.default(Effect_1.EffectValueType.ShieldKeywordShieldingCardInstanceId, false),
        ];
        for (var _i = 0, _a = _super.prototype.myRequiredEffectValues.call(this); _i < _a.length; _i++) {
            var x = _a[_i];
            tempList.push(x);
        }
        return tempList;
    };
    GiveShieldedKeywordEffect.prototype.numberOfTargetTypes = function () {
        return 1;
    };
    GiveShieldedKeywordEffect.prototype.targetTypeInfoList = function () {
        var list = [];
        list.push(new TargetTypeInfo_1.default('Targets To Be Shielded', // name
        'These are the units that are shielded by this effect. At least one must remain in the targetableZoneIdList as of PreEffect to prevent sizzle', // description
        'Targets must be cards', 1, // minMinSelectionsRequired
        null // maxMaxSelectionsRequired
        ));
        return list;
    };
    GiveShieldedKeywordEffect.prototype.effectToString = function () {
        var outText = 'Give shield strength ' +
            this.getEffectValue(Effect_1.EffectValueType.ShieldedKeywordShieldAmount)
                .setValue +
            ' to a target. It will last as long as this unit.';
        return outText;
    };
    GiveShieldedKeywordEffect.prototype.preEffect = function (state, sourceEntity, targetInfoList) {
        var targetsToBeShielded = targetInfoList[0];
        var shieldAmountEV = this.getEffectValue(Effect_1.EffectValueType.ShieldedKeywordShieldAmount);
        var shieldingCardsEV = this.getEffectValue(Effect_1.EffectValueType.ShieldKeywordShieldingCardInstanceId);
        shieldAmountEV.fitToTargetInfo(targetsToBeShielded);
        shieldingCardsEV.fitToTargetInfo(targetsToBeShielded);
        if (!this.isTargetInfoStillValid(sourceEntity, state, targetsToBeShielded, this.targetTypes[0]))
            return false;
        for (var i = 0; i < shieldAmountEV.modInts.length; i++) {
            shieldAmountEV.modInts[i].baseValue = shieldAmountEV.setValue;
            shieldingCardsEV.modInts[i].baseValue = sourceEntity.instanceId;
        }
        return true;
    };
    GiveShieldedKeywordEffect.prototype.resolve = function (state, sourceEntity, targetInfoList) {
        var cardsToGiveKeyword = targetInfoList[0];
        var cardsToGiveKeywordTargetType = this.targetTypes[0];
        if (!this.isTargetInfoStillValid(sourceEntity, state, cardsToGiveKeyword, this.targetTypes[0]))
            return;
        var shieldAmountEV = this.getEffectValue(Effect_1.EffectValueType.ShieldedKeywordShieldAmount);
        var shieldingCardsEV = this.getEffectValue(Effect_1.EffectValueType.ShieldKeywordShieldingCardInstanceId);
        for (var i = 0; i < cardsToGiveKeyword.cardInstanceIdList.length; i++) {
            var currentTargetCard = state.getCardFromAnywhere(cardsToGiveKeyword.cardInstanceIdList[i]);
            if (!cardsToGiveKeywordTargetType.cardSatisfiesConditions(currentTargetCard))
                break;
            currentTargetCard.addKeyword(Keyword_1.KeywordType.Shielded, null, 'Add Shielded Description Somewhere, maybe here', this.getEffectValue(Effect_1.EffectValueType.KeywordIsPermanent).modInts[i]
                .effectiveValue === 1, this.getEffectValue(Effect_1.EffectValueType.KeywordDuration).modInts[i]
                .effectiveValue, [
                new KeywordValue_1.default(Keyword_1.KeywordValueType.shieldAmount, shieldAmountEV.effectiveValues()),
                new KeywordValue_1.default(Keyword_1.KeywordValueType.shieldingCardInstanceId, shieldingCardsEV.effectiveValues()),
            ], true, // of course it should be active
            [], // new list of Condition
            'Hard code in image name here');
        }
    };
    return GiveShieldedKeywordEffect;
}(GiveKeywordBaseEffect_1.default));
exports.default = GiveShieldedKeywordEffect;
