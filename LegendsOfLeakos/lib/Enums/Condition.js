"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionValueType = exports.ConditionType = void 0;
var ConditionType;
(function (ConditionType) {
    ConditionType[ConditionType["HasKeywordCardCondition"] = 0] = "HasKeywordCardCondition";
    ConditionType[ConditionType["EntitiesInSameZone"] = 1] = "EntitiesInSameZone";
})(ConditionType || (ConditionType = {}));
exports.ConditionType = ConditionType;
var ConditionValueType;
(function (ConditionValueType) {
    ConditionValueType[ConditionValueType["HasKeywordOfKeywordType"] = 0] = "HasKeywordOfKeywordType";
    ConditionValueType[ConditionValueType["IsInZoneOfZoneID"] = 1] = "IsInZoneOfZoneID";
})(ConditionValueType || (ConditionValueType = {}));
exports.ConditionValueType = ConditionValueType;
