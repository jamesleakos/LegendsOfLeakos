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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Condition_1 = require("../Condition/Condition");
var ModifiableInt_1 = __importDefault(require("../ModifableInt/ModifiableInt"));
var TargetTypeUpgrade = /** @class */ (function () {
    function TargetTypeUpgrade(targetTypeIndex, newTargetTypeEnum, newTargetableTypeSelectionEnum, minSelectionsRequiredChange, maxSelectionsAllowedChange, minSelectionsThatMustRemainChange, newConditions, removeCondtionsOfType) {
        this.targetTypeIndex = targetTypeIndex;
        this.newTargetTypeEnum = newTargetTypeEnum;
        this.newTargetableTypeSelectionEnum = newTargetableTypeSelectionEnum;
        this.minSelectionsRequiredChange = new ModifiableInt_1.default(minSelectionsRequiredChange.baseValue, minSelectionsRequiredChange.effectValueIntModifiers);
        this.maxSelectionsAllowedChange = new ModifiableInt_1.default(maxSelectionsAllowedChange.baseValue, maxSelectionsAllowedChange.effectValueIntModifiers);
        this.minSelectionsThatMustRemainChange = new ModifiableInt_1.default(minSelectionsThatMustRemainChange.baseValue, minSelectionsThatMustRemainChange.effectValueIntModifiers);
        this.newConditions = newConditions.map(function (c) {
            return Condition_1.Condition.createCondition(c.conditionType, c.conditionValues).condition;
        });
        this.removeCondtionsOfType = __spreadArray([], removeCondtionsOfType, true);
    }
    return TargetTypeUpgrade;
}());
exports.default = TargetTypeUpgrade;
