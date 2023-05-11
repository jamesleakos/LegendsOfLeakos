"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ModifiableInt_1 = __importDefault(require("../ModifableInt/ModifiableInt"));
var EffectValueUpgrade = /** @class */ (function () {
    function EffectValueUpgrade(type, modInt) {
        this.effectValueType = type;
        this.setValueChange = new ModifiableInt_1.default(modInt.baseValue, modInt.intModifiers);
    }
    return EffectValueUpgrade;
}());
exports.default = EffectValueUpgrade;
