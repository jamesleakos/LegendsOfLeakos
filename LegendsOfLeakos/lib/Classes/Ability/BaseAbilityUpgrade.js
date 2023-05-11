"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseAbilityUpgrade = /** @class */ (function () {
    function BaseAbilityUpgrade() {
    }
    BaseAbilityUpgrade.prototype.upgradeAbility = function (ability) {
        this.effectUpgrade.upgradeEffect(ability.effect);
        for (var _i = 0, _a = this.addUsablePhases; _i < _a.length; _i++) {
            var phaseEnum = _a[_i];
            if (!ability.usableInPhases.includes(phaseEnum)) {
                ability.usableInPhases.push(phaseEnum);
            }
        }
        var _loop_1 = function (phaseEnum) {
            ability.usableInPhases = ability.usableInPhases.filter(function (c) { return c !== phaseEnum; });
        };
        for (var _b = 0, _c = this.removeUsablePhases; _b < _c.length; _b++) {
            var phaseEnum = _c[_b];
            _loop_1(phaseEnum);
        }
    };
    return BaseAbilityUpgrade;
}());
exports.default = BaseAbilityUpgrade;
