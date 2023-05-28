"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ModifiableInt_1 = __importDefault(require("../ModifableInt/ModifiableInt"));
var IntModifier_1 = __importDefault(require("../ModifableInt/IntModifier"));
var EffectValue = /** @class */ (function () {
    function EffectValue(effectValueType, setValue, modInts) {
        this.effectValueType = effectValueType;
        this.setValue = setValue;
        this.modInts = modInts.map(function (i) { return new ModifiableInt_1.default(i.baseValue, i.effectValueIntModifiers); });
    }
    EffectValue.prototype.fitToTargetInfo = function (targetInfo) {
        var numberOfTargets = targetInfo.targetsAreZones
            ? targetInfo.zoneInstanceIdList.length
            : targetInfo.cardInstanceIdList.length;
        this.modInts = [];
        for (var i = 0; i < numberOfTargets; i++) {
            this.modInts.push(new ModifiableInt_1.default(this.setValue, []));
        }
    };
    EffectValue.prototype.modifyEffectValueInt = function (index, modifyValue, modifyPermanent) {
        this.modInts[index].effectValueIntModifiers.push(new IntModifier_1.default(modifyValue, modifyPermanent));
    };
    EffectValue.prototype.postEffect = function () {
        this.modInts.forEach(function (evInt) {
            evInt.effectValueIntModifiers = evInt.effectValueIntModifiers.filter(function (c) { return c.permanent; });
        });
    };
    EffectValue.prototype.contains = function (x) {
        return this.modInts.some(function (i) { return i.effectiveValue === x; });
    };
    EffectValue.prototype.effectiveValues = function () {
        return this.modInts.map(function (evInt) { return evInt.effectiveValue; });
    };
    EffectValue.fromJSON = function (json) {
        return new EffectValue(json.effectValueType, json.setValue, json.modInts.map(function (i) { return ModifiableInt_1.default.fromJSON(i); }));
    };
    return EffectValue;
}());
exports.default = EffectValue;
