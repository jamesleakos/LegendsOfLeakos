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
var AbilityKeywordRuntimeEntity_1 = __importDefault(require("../Entity/AbilityKeywordRuntimeEntity"));
var RuntimeCard = /** @class */ (function (_super) {
    __extends(RuntimeCard, _super);
    function RuntimeCard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.upgradesApplied = [];
        _this.getStatList = function () { return [_this.attack, _this.health, _this.priority]; };
        _this.battlecryAbilities = [];
        _this.enchantments = [];
        return _this;
    }
    RuntimeCard.prototype.preResolveEffect = function (e, sourceCard, gameState, targetInfoList) {
        for (var _i = 0, _a = this.enchantments; _i < _a.length; _i++) {
            var enchantment = _a[_i];
            enchantment.preResolveEffect(e, sourceCard, gameState, targetInfoList);
        }
        _super.prototype.preResolveEffect.call(this, e, sourceCard, gameState, targetInfoList);
    };
    RuntimeCard.prototype.postResolveEffect = function (e, sourceCard, gameState, targetInfoList) {
        for (var _i = 0, _a = this.enchantments; _i < _a.length; _i++) {
            var enchantment = _a[_i];
            enchantment.postResolveEffect(e, sourceCard, gameState, targetInfoList);
        }
        _super.prototype.postResolveEffect.call(this, e, sourceCard, gameState, targetInfoList);
    };
    return RuntimeCard;
}(AbilityKeywordRuntimeEntity_1.default));
exports.default = RuntimeCard;
