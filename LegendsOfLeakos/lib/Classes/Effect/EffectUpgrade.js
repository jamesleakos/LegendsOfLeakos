"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Effect_1 = require("../../Enums/Effect");
var EffectValueUpgrade_1 = __importDefault(require("../Effect/EffectValueUpgrade"));
var TargetTypeUpgrade_1 = __importDefault(require("../Target/TargetTypeUpgrade"));
var Target_1 = require("../../Enums/Target");
var Condition_1 = require("../Condition/Condition");
var EffectUpgrade = /** @class */ (function () {
    function EffectUpgrade(effectType, effectValueUpgrades, targetTypeUpgrades) {
        this.effectEnum = effectType;
        this.effectValueUpgrades = effectValueUpgrades.map(function (upgrade) {
            return new EffectValueUpgrade_1.default(upgrade.effectValueType, upgrade.setValueChange);
        });
        this.targetTypeUpgrades = targetTypeUpgrades.map(function (upgrade) {
            return new TargetTypeUpgrade_1.default(upgrade.targetTypeIndex, upgrade.newTargetTypeEnum, upgrade.newTargetableTypeSelectionEnum, upgrade.minSelectionsRequiredChange, upgrade.maxSelectionsAllowedChange, upgrade.minSelectionsThatMustRemainChange, upgrade.newConditions, upgrade.removeCondtionsOfType);
        });
    }
    EffectUpgrade.prototype.upgradeEffect = function (effect) {
        if (effect.effectEnum !== this.effectEnum)
            return;
        var _loop_1 = function (evu) {
            var ev = effect.effectValueList.find(function (c) { return c.effectValueType === evu.effectValueType; });
            if (ev) {
                ev.setValue += evu.setValueChange.effectiveValue;
            }
        };
        for (var _i = 0, _a = this.effectValueUpgrades; _i < _a.length; _i++) {
            var evu = _a[_i];
            _loop_1(evu);
        }
        for (var _b = 0, _c = this.targetTypeUpgrades; _b < _c.length; _b++) {
            var ttu = _c[_b];
            if (effect.targetTypes.length <= ttu.targetTypeIndex)
                continue;
            var tt = effect.targetTypes[ttu.targetTypeIndex];
            tt.targetTypeEnum = ttu.newTargetTypeEnum;
            tt.targetableTypeSelectionEnum = ttu.newTargetableTypeSelectionEnum;
            tt.playerSelectsTarget =
                ttu.newTargetableTypeSelectionEnum !==
                    Target_1.TargetableTypeSelectionEnum.AutoTarget;
            tt.minSelectionsRequired +=
                ttu.minSelectionsRequiredChange.effectiveValue;
            tt.maxSelectionsAllowed += ttu.maxSelectionsAllowedChange.effectiveValue;
            tt.minSelectionsThatMustRemain +=
                ttu.minSelectionsThatMustRemainChange.effectiveValue;
            for (var _d = 0, _e = ttu.newConditions; _d < _e.length; _d++) {
                var c = _e[_d];
                tt.conditions.push(Condition_1.Condition.createCondition(c.conditionType, c.conditionValues)
                    .condition);
            }
            var _loop_2 = function (ct) {
                tt.conditions = tt.conditions.filter(function (c) { return c.conditionType !== ct; });
            };
            for (var _f = 0, _g = ttu.removeCondtionsOfType; _f < _g.length; _f++) {
                var ct = _g[_f];
                _loop_2(ct);
            }
        }
    };
    EffectUpgrade.prototype.toJSON = function () {
        return {
            effectEnum: this.effectEnum.toString(),
            effectValueUpgrades: this.effectValueUpgrades.map(function (evu) { return evu.toJSON(); }),
            targetTypeUpgrades: this.targetTypeUpgrades.map(function (ttu) { return ttu.toJSON(); }),
        };
    };
    EffectUpgrade.fromJSON = function (json) {
        return new EffectUpgrade(Effect_1.EffectType[json.effectEnum], json.effectValueUpgrades.map(function (evu) {
            return EffectValueUpgrade_1.default.fromJSON(evu);
        }), json.targetTypeUpgrades.map(function (ttu) { return TargetTypeUpgrade_1.default.fromJSON(ttu); }));
    };
    return EffectUpgrade;
}());
exports.default = EffectUpgrade;
