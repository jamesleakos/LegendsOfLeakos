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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseAbility_1 = __importDefault(require("./BaseAbility"));
var PayResourceCost_1 = __importDefault(require("../PayResourceCost/PayResourceCost"));
var Effect_1 = __importDefault(require("../Effect/Effect"));
var Ability_1 = require("../../Enums/Ability");
// Import other required classes and types
var ActivatedAbility = /** @class */ (function (_super) {
    __extends(ActivatedAbility, _super);
    function ActivatedAbility(indexForUpgrades, setName, setEffect, setCosts, setUsesPerTurn, setUsesRemaining, usableInPhases, isActive, imageName) {
        var _this = _super.call(this) || this;
        _this.costs = [];
        _this.name = setName;
        _this.indexForUpgrades = indexForUpgrades;
        _this.type = Ability_1.AbilityType.Activated;
        _this.effect = setEffect;
        _this.isActive = isActive;
        setCosts.forEach(function (cost) {
            var temp = new PayResourceCost_1.default(cost.statId, cost.value);
            _this.costs.push(temp);
        });
        _this.usesPerTurn = setUsesPerTurn;
        _this.usesRemaining = setUsesRemaining;
        usableInPhases.forEach(function (phase) {
            _this.usableInPhases.push(phase);
        });
        _this.imageName = imageName;
        return _this;
    }
    ActivatedAbility.prototype.onEndTurn = function () {
        this.usesRemaining = this.usesPerTurn;
        this.effect.onEndTurn();
    };
    ActivatedAbility.createActivatedAbility = function (indexForUpgrades, abilityName, effect, costs, usesPerTurn, usesRemaining, usableInPhases, isActive, imageName) {
        var AA = new ActivatedAbility(indexForUpgrades, abilityName, effect, costs, usesPerTurn, usesRemaining, usableInPhases, isActive, imageName);
        return AA;
    };
    ActivatedAbility.fromJSON = function (json) {
        return ActivatedAbility.createActivatedAbility(json.indexForUpgrades, json.name, Effect_1.default.fromJSON(json.effect), json.costs.map(function (cost) { return PayResourceCost_1.default.fromJSON(cost); }), json.usesPerTurn, json.usesRemaining, json.usableInPhases, json.isActive, json.imageName);
    };
    return ActivatedAbility;
}(BaseAbility_1.default));
exports.default = ActivatedAbility;
