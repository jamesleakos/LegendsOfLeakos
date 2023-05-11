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
var AttackBaseEffect_1 = __importDefault(require("./AttackBaseEffect"));
var Effect_1 = require("../../../../Enums/Effect");
var NormalAttackEffect = /** @class */ (function (_super) {
    __extends(NormalAttackEffect, _super);
    function NormalAttackEffect(setEffectValues, setTargetTypes) {
        var _this = _super.call(this) || this;
        _this.effectEnum = Effect_1.EffectType.NormalAttack;
        _this.SetEffectValueList(setEffectValues);
        _this.SetTargetTypeList(setTargetTypes);
        return _this;
    }
    NormalAttackEffect.MyRequiredEffectValues = function () {
        var tempList = [];
        for (var _i = 0, _a = _super.MyRequiredEffectValues.call(this); _i < _a.length; _i++) {
            var x = _a[_i];
            tempList.push(x);
        }
        return tempList;
    };
    NormalAttackEffect.NumberOfTargetTypes = function () {
        return 1;
    };
    NormalAttackEffect.TargetTypeInfoList = function () {
        var list = [];
        list.push(new TargetTypeInfo('Target to be attacked', // name
        'Targets to be attacked.', // description
        'Targets must be cards', 1, // minMinSelectionsRequired
        1 // maxMaxSelectionsRequired
        ));
        return list;
    };
    NormalAttackEffect.EffectToString = function () {
        var outText = "Unit attacks another unit. They both take damage equal to the other's attack.";
        return outText;
    };
    NormalAttackEffect.prototype.PreEffect = function (state, sourceEntity, targetInfoList) {
        if (!(sourceEntity instanceof RuntimeCard))
            throw new Error('Why is non card entity attacking?');
        var sourceCard = sourceEntity;
        // Rerouting Blocked Attacks
        var attackedCard = this.GetAttackedCard(state, targetInfoList);
        var actualBlockingCards = [];
        var assignedBlockingCards = [];
        if (attackedCard.residingZone.zoneEnum === ZoneEnum.BackBoard) {
            for (var i = 0; i < state.effectSolver.blockedCards.length; i++) {
                if (state.effectSolver.blockedCards[i] === attackedCard.instanceId) {
                    var blockingCard = state.GetCardFromAnywhere(state.effectSolver.blockingCards[i]);
                    assignedBlockingCards.push(blockingCard);
                    if (blockingCard.residingZone.zoneEnum === ZoneEnum.FrontBoard) {
                        actualBlockingCards.push(blockingCard);
                    }
                }
            }
        }
        if (actualBlockingCards.length > 0) {
            this.SendToBlockingEffect(state, sourceCard, attackedCard, actualBlockingCards);
            return false;
        }
        var damageToAttackedCardEV = this.GetEffectValue(EffectValueType.DamageToAttackedCard);
        var damageToAttackingCardEV = this.GetEffectValue(EffectValueType.DamageToAttackingCard);
        var attackedCardDamagePreventedEV = this.GetEffectValue(EffectValueType.AttackedCardDamagePrevented);
        var attackingCardDamagePreventedEV = this.GetEffectValue(EffectValueType.AttackingCardDamagePrevented);
        damageToAttackedCardEV.setValue =
            sourceCard.namedStats['Attack'].effectiveValue;
        damageToAttackingCardEV.setValue =
            attackedCard.namedStats['Attack'].effectiveValue;
        var targetToBeAttacked = targetInfoList[0];
        damageToAttackedCardEV.FitToTargetInfo(targetToBeAttacked);
        attackedCardDamagePreventedEV.FitToTargetInfo(targetToBeAttacked);
        var attacker = new TargetInfo([sourceCard.instanceId], [], false, false, false);
        damageToAttackingCardEV.FitToTargetInfo(attacker);
        attackingCardDamagePreventedEV.FitToTargetInfo(attacker);
        if (!(this.IsCardStillInPlay(attackedCard) &&
            this.IsCardStillInPlay(sourceCard)))
            return false;
        return true;
    };
    NormalAttackEffect.prototype.Resolve = function (state, sourceEntity, targetInfoList) {
        if (!(sourceEntity instanceof RuntimeCard))
            throw new Error('Why is non card entity attacking?');
        var sourceCard = sourceEntity;
        var attackedCard = this.GetAttackedCard(state, targetInfoList);
        var damageToAttackedCard = this.GetEffectValue(EffectValueType.DamageToAttackedCard).modInts[0].effectiveValue;
        var damageToAttackingCard = this.GetEffectValue(EffectValueType.DamageToAttackingCard).modInts[0].effectiveValue;
        // ... rest of your method ...
    };
    NormalAttackEffect.prototype.GetAttackedCard = function (state, targetInfoList) {
        return state.GetCardFromAnywhere(targetInfoList[0].cardInstanceIdList[0]);
    };
    NormalAttackEffect.prototype.ApplyShieldToAttackedCard = function (shieldAmount) {
        console.log('Here we need to add a modifier to the DamageToAttackedCardEffectValue');
    };
    NormalAttackEffect.prototype.HitDivineShield = function () {
        console.log('Here we need to implement this');
    };
    NormalAttackEffect.prototype.SendToBlockingEffect = function (state, sourceCard, attackedCard, blockingCards) {
        blockingCards.sort(function (p, q) { return p.serverBlockOrder - q.serverBlockOrder; });
        console.log('need to check here the order it was sorted in - ascending vs decending');
        // ... rest of your method ...
    };
    return NormalAttackEffect;
}(AttackBaseEffect_1.default));
