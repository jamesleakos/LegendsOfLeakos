"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var IntModifier_1 = __importDefault(require("./IntModifier"));
var ModifiableInt = /** @class */ (function () {
    function ModifiableInt(baseValue, effectValueIntModifiers) {
        this.baseValue = baseValue;
        this.intModifiers = [];
        for (var _i = 0, effectValueIntModifiers_1 = effectValueIntModifiers; _i < effectValueIntModifiers_1.length; _i++) {
            var i = effectValueIntModifiers_1[_i];
            this.intModifiers.push(new IntModifier_1.default(i.value, i.permanent));
        }
    }
    Object.defineProperty(ModifiableInt.prototype, "effectiveValue", {
        get: function () {
            var value = this.baseValue;
            for (var _i = 0, _a = this.intModifiers; _i < _a.length; _i++) {
                var modifier = _a[_i];
                value += modifier.value;
            }
            return value;
        },
        enumerable: false,
        configurable: true
    });
    return ModifiableInt;
}());
exports.default = ModifiableInt;