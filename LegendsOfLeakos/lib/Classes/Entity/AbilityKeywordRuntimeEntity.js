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
var TargetableRuntimeEntity_1 = __importDefault(require("./TargetableRuntimeEntity"));
var RuntimeKeyword_1 = __importDefault(require("../Keyword/RuntimeKeyword"));
/**
 * This class extends TargetableRuntimeEntity and provides abilities and keywords to that class. It is currently used by
 * cards and enchantments.
 */
var AbilityKeywordRuntimeEntity = /** @class */ (function (_super) {
    __extends(AbilityKeywordRuntimeEntity, _super);
    function AbilityKeywordRuntimeEntity() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.runtimeKeywords = [];
        _this.activatedAbilities = [];
        _this.keywordsToRemove = [];
        return _this;
        // endregion
    }
    // Keywords Functions
    /**
     * Adds a keyword to this card.
     */
    AbilityKeywordRuntimeEntity.prototype.addKeyword = function (keywordType, indexForUpgrades, description, isPermanent, duration, valueList, isActive, conditions, imageName) {
        var k = RuntimeKeyword_1.default.createRuntimeKeyword(this.instanceId, keywordType, indexForUpgrades, description, isPermanent, duration, valueList, isActive, conditions, imageName).keyword;
        k.myEntity = this;
        this.runtimeKeywords.push(k);
        if (this.onKeywordAdded) {
            this.onKeywordAdded(k);
        }
    };
    AbilityKeywordRuntimeEntity.prototype.condemnKeywordToRemoval = function (k) {
        this.keywordsToRemove.push(k);
    };
    AbilityKeywordRuntimeEntity.prototype.clearKeywordsToRemove = function () {
        for (var _i = 0, _a = this.keywordsToRemove; _i < _a.length; _i++) {
            var k = _a[_i];
            this.removeKeyword(k);
        }
        this.keywordsToRemove = [];
    };
    AbilityKeywordRuntimeEntity.prototype.removeKeyword = function (keyword) {
        var index = this.runtimeKeywords.indexOf(keyword);
        if (index > -1) {
            this.runtimeKeywords.splice(index, 1);
        }
        if (this.onKeywordRemoved) {
            this.onKeywordRemoved(keyword);
        }
    };
    AbilityKeywordRuntimeEntity.prototype.hasKeyword = function (keywordType) {
        var k = this.runtimeKeywords.find(function (x) { return x.keywordType === keywordType; });
        return k !== undefined;
    };
    // Functions for Effect / Keyword Interactions
    // END TURN
    AbilityKeywordRuntimeEntity.prototype.onEndTurn = function () {
        for (var _i = 0, _a = this.activatedAbilities; _i < _a.length; _i++) {
            var activatedAbility = _a[_i];
            if (!activatedAbility.isActive)
                continue;
            activatedAbility.onEndTurn();
        }
        for (var _b = 0, _c = this.runtimeKeywords; _b < _c.length; _b++) {
            var k = _c[_b];
            if (!k.isActive)
                continue;
            k.onEndTurn();
        }
    };
    // CARD EFFECT
    AbilityKeywordRuntimeEntity.prototype.preResolveEffect = function (e, sourceCard, gameState, targetInfoList) {
        for (var _i = 0, _a = this.runtimeKeywords; _i < _a.length; _i++) {
            var keyword = _a[_i];
            if (!keyword.isActive)
                continue;
            keyword.preResolveEffect(this, e, sourceCard, gameState, targetInfoList);
        }
        this.clearKeywordsToRemove();
    };
    AbilityKeywordRuntimeEntity.prototype.postResolveEffect = function (e, sourceCard, gameState, targetInfoList) {
        for (var _i = 0, _a = this.runtimeKeywords; _i < _a.length; _i++) {
            var keyword = _a[_i];
            if (!keyword.isActive)
                continue;
            keyword.postResolveEffect(this, e, sourceCard, gameState, targetInfoList);
        }
        this.clearKeywordsToRemove();
    };
    return AbilityKeywordRuntimeEntity;
}(TargetableRuntimeEntity_1.default));
exports.default = AbilityKeywordRuntimeEntity;
