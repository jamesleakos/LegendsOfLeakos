"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Condition = void 0;
var Condition_1 = require("../../Enums/Condition");
var ConditionValue_1 = __importDefault(require("./ConditionValue"));
var HasKeywordCardCondition_1 = __importDefault(require("./Conditions/HasKeywordCardCondition"));
var EntitiesInSameZoneCondition_1 = __importDefault(require("./Conditions/EntitiesInSameZoneCondition"));
var Condition = /** @class */ (function () {
    function Condition() {
        this.conditionValues = [];
    }
    Condition.prototype.getConditionValue = function (conditionValueEnum) {
        return this.conditionValues.find(function (x) { return x.conditionValueType === conditionValueEnum; });
    };
    Condition.prototype.requiredConditionValues = function () {
        return [];
    };
    Condition.prototype.assignConditionValues = function (conditionType, conditionValues) {
        this.conditionType = conditionType;
        for (var _i = 0, conditionValues_1 = conditionValues; _i < conditionValues_1.length; _i++) {
            var cv = conditionValues_1[_i];
            this.conditionValues.push(new ConditionValue_1.default(cv.conditionValueType, cv.values));
        }
    };
    Condition.createCondition = function (conditionType, conditionValues) {
        var outCondition = null;
        if (conditionType === Condition_1.ConditionType.HasKeywordCardCondition) {
            outCondition = new HasKeywordCardCondition_1.default(conditionType, conditionValues);
        }
        if (conditionType === Condition_1.ConditionType.EntitiesInSameZone) {
            outCondition = new EntitiesInSameZoneCondition_1.default(conditionType, conditionValues);
        }
        var success = true;
        var message = 'Condition created successfully';
        if (outCondition === null) {
            success = false;
            message =
                'Condition was not created. Check if conditionValueEnum was correct';
        }
        for (var _i = 0, conditionValues_2 = conditionValues; _i < conditionValues_2.length; _i++) {
            var cv = conditionValues_2[_i];
            if (!outCondition.requiredConditionValues().includes(cv.conditionValueType)) {
                throw new Error('Something not implemented here');
            }
        }
        return {
            condition: outCondition,
            wasSuccessful: success,
            message: message,
        };
    };
    Condition.createConditionForDeckBuilder = function (conditionType) {
        var condition = this.createCondition(conditionType, []).condition;
        for (var _i = 0, _a = condition.requiredConditionValues(); _i < _a.length; _i++) {
            var cv = _a[_i];
            var temp = new ConditionValue_1.default(cv, []);
            temp.values.push(0);
            condition.conditionValues.push(temp);
        }
        return condition;
    };
    return Condition;
}());
exports.Condition = Condition;
