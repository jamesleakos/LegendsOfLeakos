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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CardCondition_1 = __importDefault(require("../CardCondition"));
var Condition_1 = require("../../../Enums/Condition");
var Keyword_1 = require("../../../Enums/Keyword");
var HasKeywordCardCondition = /** @class */ (function (_super) {
    __extends(HasKeywordCardCondition, _super);
    function HasKeywordCardCondition(conditionType, conditionValues) {
        var _this = _super.call(this) || this;
        _this.assignConditionValues(conditionType, conditionValues);
        return _this;
    }
    HasKeywordCardCondition.prototype.requiredConditionValues = function () {
        var tempList = __spreadArray([
            Condition_1.ConditionValueType.HasKeywordOfKeywordType
        ], _super.prototype.requiredConditionValues.call(this), true);
        return tempList;
    };
    HasKeywordCardCondition.prototype.getReadableString = function () {
        return ('Has Keyword ' +
            this.getConditionValue(Condition_1.ConditionValueType.HasKeywordOfKeywordType)
                .values[0]);
    };
    HasKeywordCardCondition.prototype.isTrue = function (card) {
        var hasAllRequired = true;
        var _loop_1 = function (i) {
            if (card.runtimeKeywords.find(function (c) { return c.keywordType.toString() === Keyword_1.KeywordType[i]; }) === null)
                hasAllRequired = false;
        };
        for (var _i = 0, _a = this.getConditionValue(Condition_1.ConditionValueType.HasKeywordOfKeywordType).values; _i < _a.length; _i++) {
            var i = _a[_i];
            _loop_1(i);
        }
        return hasAllRequired;
    };
    return HasKeywordCardCondition;
}(CardCondition_1.default));
exports.default = HasKeywordCardCondition;
