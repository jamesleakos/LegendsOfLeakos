"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Effect_1 = require("../../Enums/Effect");
var EffectValue_1 = __importDefault(require("./EffectValue"));
var IntModifier_1 = __importDefault(require("../ModifableInt/IntModifier"));
var TargetType_1 = __importDefault(require("../Target/TargetType"));
var DealSetDamageEffect_1 = __importDefault(require("./Effects/CardTargetEffects/DealSetDamageEffect"));
var DealDamageEqualToAttackEffect_1 = __importDefault(require("./Effects/CardTargetEffects/DealDamageEqualToAttackEffect"));
var GiveShieldedKeywordEffect_1 = __importDefault(require("./Effects/CardTargetEffects/GiveShieldedKeywordEffect"));
var GiveShieldedKeywordBasedOnOtherUnitsEffect_1 = __importDefault(require("./Effects/CardTargetEffects/GiveShieldedKeywordBasedOnOtherUnitsEffect"));
var NormalAttackEffect_1 = __importDefault(require("./Effects/AttackEffects/NormalAttackEffect"));
var EnchantCardEffect_1 = __importDefault(require("./Effects/EnchantEffects/EnchantCardEffect"));
var EnchantZoneEffect_1 = __importDefault(require("./Effects/EnchantEffects/EnchantZoneEffect"));
// Base class of an effect. It consists of a type (which is associated with a child class, which holds the logic for execution of the effect),
// a list of EffectValues,
var Effect = /** @class */ (function () {
    function Effect() {
    }
    // Get and Set Effect Values
    Effect.prototype.setEffectValueList = function (setEffectValueList) {
        this.effectValueList = [];
        for (var _i = 0, setEffectValueList_1 = setEffectValueList; _i < setEffectValueList_1.length; _i++) {
            var ev = setEffectValueList_1[_i];
            this.effectValueList.push(new EffectValue_1.default(ev.effectValueType, ev.setValue, ev.modInts));
        }
    };
    Effect.prototype.getEffectValueList = function () {
        return this.effectValueList;
    };
    Effect.prototype.getEffectValue = function (effectValueType) {
        var value = this.effectValueList.find(function (x) { return x.effectValueType === effectValueType; });
        if (value === undefined) {
            throw new Error('Did not find this value');
        }
        return value;
    };
    Effect.prototype.modifyEffectValueInt = function (effectValueType, index, modifyValue, modifyPermanent) {
        this.effectValueList
            .find(function (x) { return x.effectValueType === effectValueType; })
            .modInts[index].intModifiers.push(new IntModifier_1.default(modifyValue, modifyPermanent));
    };
    Effect.prototype.resetEffectValues = function () {
        for (var _i = 0, _a = this.effectValueList; _i < _a.length; _i++) {
            var ev = _a[_i];
            ev.postEffect();
        }
    };
    // Get and Set Target Types
    Effect.prototype.setTargetTypeList = function (setTargetTypeList) {
        this.targetTypes = [];
        for (var _i = 0, setTargetTypeList_1 = setTargetTypeList; _i < setTargetTypeList_1.length; _i++) {
            var tt = setTargetTypeList_1[_i];
            this.targetTypes.push(new TargetType_1.default(tt.name, tt.targetTypeEnum, tt.minSelectionsRequired, tt.maxSelectionsAllowed, tt.minSelectionsThatMustRemain, tt.targetableTypeSelectionEnum, tt.conditions));
        }
    };
    Effect.prototype.getTargetTypeList = function () {
        return this.targetTypes;
    };
    // Card Builder Helpers for Human Creators
    Effect.prototype.myRequiredEffectValues = function () {
        return [];
    };
    Effect.prototype.resolve = function (state, sourceEntity, targetInfoList) {
        // Optional override
    };
    Effect.prototype.onEndTurn = function () {
        this.resetEffectValues();
    };
    Effect.createEffect = function (effectEnum, effectValueList, targetTypes) {
        var outEffect = null;
        if (effectEnum === Effect_1.EffectType.DealSetDamage) {
            outEffect = new DealSetDamageEffect_1.default(effectValueList, targetTypes);
        }
        if (effectEnum === Effect_1.EffectType.DealDamageEqualToAttack) {
            outEffect = new DealDamageEqualToAttackEffect_1.default(effectValueList, targetTypes);
        }
        if (effectEnum === Effect_1.EffectType.GiveShieldedKeyword) {
            outEffect = new GiveShieldedKeywordEffect_1.default(effectValueList, targetTypes);
        }
        if (effectEnum === Effect_1.EffectType.GiveShieldedKeywordBasedOnOtherUnits) {
            outEffect = new GiveShieldedKeywordBasedOnOtherUnitsEffect_1.default(effectValueList, targetTypes);
        }
        if (effectEnum === Effect_1.EffectType.NormalAttack) {
            outEffect = new NormalAttackEffect_1.default(effectValueList, targetTypes);
        }
        if (effectEnum === Effect_1.EffectType.EnchantCard) {
            outEffect = new EnchantCardEffect_1.default(effectValueList, targetTypes);
        }
        if (effectEnum === Effect_1.EffectType.EnchantZone) {
            outEffect = new EnchantZoneEffect_1.default(effectValueList, targetTypes);
        }
        var success = true;
        var message = 'Effect created successfully';
        if (outEffect === null) {
            success = false;
            message = 'Effect was not created. Check if EffectEnum was correct';
        }
        var _loop_1 = function (ev) {
            if (outEffect
                .myRequiredEffectValues()
                .find(function (c) { return c.effectValueType === ev.effectValueType; }) === null) {
                success = false;
                message =
                    'Missing required effectvalue ' + ev.effectValueType.toString();
            }
        };
        for (var _i = 0, effectValueList_1 = effectValueList; _i < effectValueList_1.length; _i++) {
            var ev = effectValueList_1[_i];
            _loop_1(ev);
        }
        if (outEffect.numberOfTargetTypes() !== targetTypes.length) {
            success = false;
            message = 'Number of target types do not match';
        }
        return { effect: outEffect, wasSuccessful: success, message: message };
    };
    return Effect;
}());
exports.default = Effect;
