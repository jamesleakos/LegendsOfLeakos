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
exports.WarleaderKeyword = void 0;
var RuntimeKeyword_1 = __importDefault(require("../../RuntimeKeyword"));
var StatBuff_1 = __importDefault(require("../../../Stat/StatBuff"));
var CardCondition_1 = __importDefault(require("../../../Condition/CardCondition"));
var EntitiesInSameZoneCondition_1 = __importDefault(require("../../../Condition/Conditions/EntitiesInSameZoneCondition"));
var Keyword_1 = require("../../../../Enums/Keyword");
var WarleaderKeyword = /** @class */ (function (_super) {
    __extends(WarleaderKeyword, _super);
    function WarleaderKeyword(setMyEntityId, keywordType, indexForUpgrades, setDescription, setIsPermanent, setDuration, keywordValueList, isActive, conditions, imageName) {
        var _this = _super.call(this) || this;
        _this.setBaseData(setMyEntityId, keywordType, indexForUpgrades, setDescription, setIsPermanent, setDuration, keywordValueList, isActive, conditions, imageName);
        return _this;
    }
    WarleaderKeyword.prototype.addStatBuff = function (stat, statCard, gameState) {
        for (var _i = 0, _a = this.conditions; _i < _a.length; _i++) {
            var condition = _a[_i];
            switch (condition.constructor) {
                case CardCondition_1.default:
                    if (!condition.isTrue(statCard))
                        return null;
                    break;
                case EntitiesInSameZoneCondition_1.default:
                    if (!condition.isTrue(statCard, this.myEntity))
                        return null;
                    break;
                default:
                    throw new Error('Case Not Implemented');
            }
        }
        switch (stat.name) {
            case 'Attack':
                if (this.keywordValueList.find(function (c) { return c.keywordValueType === Keyword_1.KeywordValueType.statCardBuffAttack; }) !== null) {
                    return new StatBuff_1.default(this.getKeywordValue(Keyword_1.KeywordValueType.statCardBuffAttack), this.myEntity.name +
                        ' is granting ' +
                        this.getKeywordValue(Keyword_1.KeywordValueType.statCardBuffAttack).toString() +
                        ' attack.');
                }
                break;
            case 'Life':
                if (this.keywordValueList.find(function (c) { return c.keywordValueType === Keyword_1.KeywordValueType.statCardBuffHealth; }) !== null) {
                    return new StatBuff_1.default(this.getKeywordValue(Keyword_1.KeywordValueType.statCardBuffHealth), this.myEntity.name +
                        ' is granting ' +
                        this.getKeywordValue(Keyword_1.KeywordValueType.statCardBuffHealth).toString() +
                        ' health.');
                }
                break;
            default:
                return null;
        }
        // shouldn't need this because of the switch but oh well
        return null;
    };
    return WarleaderKeyword;
}(RuntimeKeyword_1.default));
exports.WarleaderKeyword = WarleaderKeyword;
exports.default = WarleaderKeyword;
