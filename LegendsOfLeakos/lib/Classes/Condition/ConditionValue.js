"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Condition_1 = require("../../Enums/Condition");
var Zone_1 = require("../../Enums/Zone");
var Keyword_1 = require("../../Enums/Keyword");
var ConditionValue = /** @class */ (function () {
    function ConditionValue(conditionValueType, values) {
        this.values = [];
        this.conditionValueType = conditionValueType;
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var v = values_1[_i];
            this.values.push(v);
        }
    }
    ConditionValue.prototype.returnReadableStringOfValues = function () {
        var tempString = '';
        for (var i = 0; i < this.values.length; i++) {
            tempString += this.getValueString(this.values[i]);
            if (i < this.values.length - 1)
                tempString += ', ';
        }
        return tempString;
    };
    ConditionValue.prototype.getValueString = function (index) {
        switch (this.conditionValueType) {
            case Condition_1.ConditionValueType.HasKeywordOfKeywordType:
                return Keyword_1.KeywordType[index].toString();
            case Condition_1.ConditionValueType.IsInZoneOfZoneID:
                return Zone_1.ZoneEnum[index].toString();
            default:
                return 'Not found - Come Look for Error';
        }
    };
    return ConditionValue;
}());
exports.default = ConditionValue;
