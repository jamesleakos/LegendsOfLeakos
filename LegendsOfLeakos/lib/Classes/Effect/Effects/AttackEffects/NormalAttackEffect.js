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
var EffectValue_1 = __importDefault(require("../../EffectValue"));
var TargetType_1 = __importDefault(require("../../../Target/TargetType"));
var TargetInfo_1 = __importDefault(require("../../../Target/TargetInfo"));
var TargetTypeInfo_1 = __importDefault(require("../../../Target/TargetTypeInfo"));
var Target_1 = require("../../../../Enums/Target");
var RuntimeCard_1 = __importDefault(require("../../../Card/RuntimeCard"));
var Zone_1 = require("../../../../Enums/Zone");
var Effect_2 = __importDefault(require("../../Effect"));
var Effect_3 = require("../../../../Enums/Effect");
var NormalAttackEffect = /** @class */ (function (_super) {
    __extends(NormalAttackEffect, _super);
    function NormalAttackEffect(setEffectValues, setTargetTypes) {
        var _this = _super.call(this) || this;
        _this.effectEnum = Effect_1.EffectType.NormalAttack;
        _this.setEffectValueList(setEffectValues);
        _this.setTargetTypeList(setTargetTypes);
        return _this;
    }
    NormalAttackEffect.prototype.myRequiredEffectValues = function () {
        var tempList = [];
        for (var _i = 0, _a = _super.prototype.myRequiredEffectValues.call(this); _i < _a.length; _i++) {
            var x = _a[_i];
            tempList.push(x);
        }
        return tempList;
    };
    NormalAttackEffect.prototype.numberOfTargetTypes = function () {
        return 1;
    };
    NormalAttackEffect.prototype.targetTypeInfoList = function () {
        var list = [];
        list.push(new TargetTypeInfo_1.default('Target to be attacked', // name
        'Targets to be attacked.', // description
        'Targets must be cards', 1, // minMinSelectionsRequired
        1 // maxMaxSelectionsRequired
        ));
        return list;
    };
    NormalAttackEffect.prototype.effectToString = function () {
        var outText = "Unit attacks another unit. They both take damage equal to the other's attack.";
        return outText;
    };
    NormalAttackEffect.prototype.preEffect = function (state, sourceEntity, targetInfoList) {
        if (!(sourceEntity instanceof RuntimeCard_1.default))
            throw new Error('Why is non card entity attacking?');
        var sourceCard = sourceEntity;
        // Rerouting Blocked Attacks
        var attackedCard = this.getAttackedCard(state, targetInfoList);
        var actualBlockingCards = [];
        var assignedBlockingCards = [];
        if (attackedCard.residingZone.zoneEnum === Zone_1.ZoneEnum.BackBoard) {
            for (var i = 0; i < state.effectSolver.blockedCards.length; i++) {
                if (state.effectSolver.blockedCards[i] === attackedCard.instanceId) {
                    var blockingCard = state.getCardFromAnywhere(state.effectSolver.blockingCards[i]);
                    assignedBlockingCards.push(blockingCard);
                    if (blockingCard.residingZone.zoneEnum === Zone_1.ZoneEnum.FrontBoard) {
                        actualBlockingCards.push(blockingCard);
                    }
                }
            }
        }
        if (actualBlockingCards.length > 0) {
            this.SendToBlockingEffect(state, sourceCard, attackedCard, actualBlockingCards);
            return false;
        }
        var damageToAttackedCardEV = this.getEffectValue(Effect_3.EffectValueType.DamageToAttackedCard);
        var damageToAttackingCardEV = this.getEffectValue(Effect_3.EffectValueType.DamageToAttackingCard);
        var attackedCardDamagePreventedEV = this.getEffectValue(Effect_3.EffectValueType.AttackedCardDamagePrevented);
        var attackingCardDamagePreventedEV = this.getEffectValue(Effect_3.EffectValueType.AttackingCardDamagePrevented);
        damageToAttackedCardEV.setValue = sourceCard.attack.effectiveValue;
        damageToAttackingCardEV.setValue = attackedCard.attack.effectiveValue;
        var targetToBeAttacked = targetInfoList[0];
        damageToAttackedCardEV.fitToTargetInfo(targetToBeAttacked);
        attackedCardDamagePreventedEV.fitToTargetInfo(targetToBeAttacked);
        var attacker = new TargetInfo_1.default([sourceCard.instanceId], [], false, false, false);
        damageToAttackingCardEV.fitToTargetInfo(attacker);
        attackingCardDamagePreventedEV.fitToTargetInfo(attacker);
        if (!(this.isCardStillInPlay(attackedCard) &&
            this.isCardStillInPlay(sourceCard)))
            return false;
        return true;
    };
    NormalAttackEffect.prototype.resolve = function (state, sourceEntity, targetInfoList) {
        if (!(sourceEntity instanceof RuntimeCard_1.default))
            throw new Error('Why is non card entity attacking?');
        var sourceCard = sourceEntity;
        var attackedCard = this.getAttackedCard(state, targetInfoList);
        var damageToAttackedCard = this.getEffectValue(Effect_3.EffectValueType.DamageToAttackedCard).modInts[0].effectiveValue;
        var damageToAttackingCard = this.getEffectValue(Effect_3.EffectValueType.DamageToAttackingCard).modInts[0].effectiveValue;
        if (!(this.isCardStillInPlay(attackedCard) &&
            this.isCardStillInPlay(sourceCard)))
            return;
        if (this.getEffectValue(Effect_3.EffectValueType.AttackedCardDamagePrevented).effectiveValues()[0] === 0)
            attackedCard.health.baseValue -= damageToAttackedCard;
        if (this.getEffectValue(Effect_3.EffectValueType.AttackingCardDamagePrevented).effectiveValues()[0] === 0)
            sourceCard.health.baseValue -= damageToAttackingCard;
    };
    NormalAttackEffect.prototype.getAttackedCard = function (state, targetInfoList) {
        return state.getCardFromAnywhere(targetInfoList[0].cardInstanceIdList[0]);
    };
    NormalAttackEffect.prototype.applyShieldToAttackedCard = function (shieldAmount) {
        console.log('Here we need to add a modifier to the DamageToAttackedCardEffectValue');
    };
    NormalAttackEffect.prototype.hitDivineShield = function () {
        console.log('Here we need to implement this');
    };
    NormalAttackEffect.prototype.SendToBlockingEffect = function (state, sourceCard, attackedCard, blockingCards) {
        blockingCards.sort(function (p, q) { return p.serverBlockOrder - q.serverBlockOrder; });
        console.log('need to check here the order it was sorted in - ascending vs decending');
        var targetTypes = [];
        targetTypes.push(new TargetType_1.default('Attacked Card', Target_1.TargetTypeEnum.TargetOpponentCreature, 1, 1, 1, Target_1.TargetableTypeSelectionEnum.TargetableOnActivation, []));
        targetTypes.push(new TargetType_1.default('Blocking Cards', Target_1.TargetTypeEnum.TargetOpponentCreature, 0, Number.MAX_SAFE_INTEGER, 0, Target_1.TargetableTypeSelectionEnum.AutoTarget, []));
        var effectValues = [];
        effectValues.push(new EffectValue_1.default(Effect_3.EffectValueType.DamageToAttackedCard, 0, []));
        effectValues.push(new EffectValue_1.default(Effect_3.EffectValueType.DamageToAttackingCard, 0, []));
        effectValues.push(new EffectValue_1.default(Effect_3.EffectValueType.AttackedCardDamagePrevented, 0, []));
        effectValues.push(new EffectValue_1.default(Effect_3.EffectValueType.AttackingCardDamagePrevented, 0, []));
        effectValues.push(new EffectValue_1.default(Effect_3.EffectValueType.DamageToBlockingCards, 0, []));
        effectValues.push(new EffectValue_1.default(Effect_3.EffectValueType.BlockingCardInstanceIds, 0, []));
        effectValues.push(new EffectValue_1.default(Effect_3.EffectValueType.DamageToBlockingCardsPrevented, 0, []));
        var tempTargetInfo = state.effectSolver.createFightTargetInfoList(attackedCard.instanceId);
        var blockedTargetInfoList = [];
        var blockingCardList = [];
        var zoneList = [];
        for (var _i = 0, blockingCards_1 = blockingCards; _i < blockingCards_1.length; _i++) {
            var card = blockingCards_1[_i];
            blockingCardList.push(card.instanceId);
            zoneList.push(card.residingZone.instanceId);
        }
        var blockersTargetInfo = new TargetInfo_1.default(blockingCardList, zoneList, false, false, false);
        tempTargetInfo.push(blockersTargetInfo);
        state.effectSolver.doEffect(sourceCard, Effect_2.default.createEffect(Effect_1.EffectType.BlockedAttack, effectValues, targetTypes)
            .effect, blockedTargetInfoList);
    };
    return NormalAttackEffect;
}(AttackBaseEffect_1.default));
exports.default = NormalAttackEffect;
