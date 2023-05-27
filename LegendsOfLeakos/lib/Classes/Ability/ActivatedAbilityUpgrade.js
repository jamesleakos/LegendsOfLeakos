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
var BaseAbilityUpgrade_1 = __importDefault(require("./BaseAbilityUpgrade"));
var EffectUpgrade_1 = __importDefault(require("../Effect/EffectUpgrade"));
var ActivatedAbility_1 = __importDefault(require("./ActivatedAbility"));
var PayResourceCost_1 = __importDefault(require("../PayResourceCost/PayResourceCost"));
var PayResourceCostUpgrade_1 = __importDefault(require("../PayResourceCost/PayResourceCostUpgrade"));
var ModifiableInt_1 = __importDefault(require("../ModifableInt/ModifiableInt"));
var ActivatedAbilityUpgrade = /** @class */ (function (_super) {
    __extends(ActivatedAbilityUpgrade, _super);
    function ActivatedAbilityUpgrade(abilityIndex, effectUpgrade, addUsablePhases, removeUsablePhases, costUpgrades, usesPerTurnChange, isActive) {
        var _this = _super.call(this) || this;
        _this.abilityUpgradeIndex = abilityIndex;
        _this.effectUpgrade = new EffectUpgrade_1.default(effectUpgrade.effectEnum, effectUpgrade.effectValueUpgrades, effectUpgrade.targetTypeUpgrades);
        _this.usesPerTurnChange = new ModifiableInt_1.default(usesPerTurnChange.baseValue, usesPerTurnChange.effectValueIntModifiers);
        _this.abilityUpgradeIndex = abilityIndex;
        _this.isActive = isActive;
        _this.addUsablePhases = __spreadArray([], addUsablePhases, true);
        _this.removeUsablePhases = __spreadArray([], removeUsablePhases, true);
        _this.costUpgrades = costUpgrades.map(function (upgrade) {
            return new PayResourceCostUpgrade_1.default(upgrade.statId, upgrade.valueChange);
        });
        return _this;
    }
    ActivatedAbilityUpgrade.prototype.upgradeAbility = function (ability) {
        _super.prototype.upgradeAbility.call(this, ability);
        if (!(ability instanceof ActivatedAbility_1.default))
            return;
        ability.usesPerTurn +=
            this.usesPerTurnChange.effectiveValue;
        var _loop_1 = function (costUpgrade) {
            var cost = ability.costs.find(function (c) { return c.statId === costUpgrade.statId; });
            if (cost) {
                cost.value += costUpgrade.valueChange.effectiveValue;
            }
            else {
                ability.costs.push(new PayResourceCost_1.default(costUpgrade.statId, costUpgrade.valueChange.effectiveValue));
            }
        };
        for (var _i = 0, _a = this.costUpgrades; _i < _a.length; _i++) {
            var costUpgrade = _a[_i];
            _loop_1(costUpgrade);
        }
        ability.isActive = this.isActive;
    };
    ActivatedAbilityUpgrade.fromJSON = function (json) {
        return new ActivatedAbilityUpgrade(json.abilityUpgradeIndex, EffectUpgrade_1.default.fromJSON(json.effectUpgrade), json.addUsablePhases, json.removeUsablePhases, json.costUpgrades.map(function (c) { return PayResourceCostUpgrade_1.default.fromJSON(c); }), ModifiableInt_1.default.fromJSON(json.usesPerTurnChange), json.isActive);
    };
    return ActivatedAbilityUpgrade;
}(BaseAbilityUpgrade_1.default));
exports.default = ActivatedAbilityUpgrade;
