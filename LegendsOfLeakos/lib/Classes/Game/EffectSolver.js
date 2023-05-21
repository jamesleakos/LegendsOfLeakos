"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var TargetInfo_1 = __importDefault(require("../Target/TargetInfo"));
var MoveCardEffect_1 = __importDefault(require("../Effect/Effects/MoveEffects/MoveCardEffect"));
var UpgradeCardEffect_1 = __importDefault(require("../Effect/Effects/UpgradeEffects/UpgradeCardEffect"));
var Zone_1 = require("../../Enums/Zone");
var EffectSolver = /** @class */ (function () {
    function EffectSolver(gameState, rngSeed) {
        this.blockingCards = [];
        this.blockedCards = [];
        this.gameState = gameState;
        this.gameState.effectSolver = this;
        //   this.rng = new Random(rngSeed);
    }
    // #region On Methods for Turns and Phases
    EffectSolver.prototype.onRecruitmentPhaseStarted = function () {
        // DoEffect StartPhaseEffect if this is functionality that we need.
    };
    EffectSolver.prototype.onRecruitmentPhaseEnded = function () {
        // DoEffect EndPhaseEffect if this is functionality that we need.
    };
    EffectSolver.prototype.onManeuverPhaseStarted = function () {
        // DoEffect StartPhaseEffect if this is functionality that we need.
    };
    EffectSolver.prototype.onManeuverPhaseEnded = function () {
        // DoEffect EndPhaseEffect if this is functionality that we need.
    };
    EffectSolver.prototype.onSkirmishPhaseStarted = function () {
        // DoEffect StartPhaseEffect if this is functionality that we need.
    };
    EffectSolver.prototype.onSkirmishPhaseEnded = function () {
        // DoEffect EndPhaseEffect if this is functionality that we need.
    };
    EffectSolver.prototype.onBattlePhaseStarted = function () {
        // DoEffect StartPhaseEffect if this is functionality that we need.
    };
    EffectSolver.prototype.onBattlePhaseEnded = function () {
        this.resetBlockers();
        // DoEffect EndPhaseEffect if this is functionality that we need.
    };
    // #endregion
    // Blocking
    EffectSolver.prototype.resetBlockers = function () {
        for (var _i = 0, _a = this.blockingCards; _i < _a.length; _i++) {
            var cardInstanceId = _a[_i];
            var card = this.gameState.getCardFromAnywhere(cardInstanceId);
            card.amBlocking = false;
            card.serverBlockOrder = 0;
        }
        this.blockingCards = [];
        this.blockedCards = [];
    };
    // Fight Effects
    //   moveCard(playerNetId: number, card: RuntimeCard, originZone: ZoneEnum, destinationZone: ZoneEnum, targetInfo: TargetInfo[] | null = null) {
    //       let player = this.gameState.players.find(x => x.netId === playerNetId);
    //       if (player) {
    //           this.doEffect(card, this.createMoveEffect(originZone, destinationZone), targetInfo);
    //           let libraryCard = this.gameState.config.getCardFromLibraryId(card.libraryId);
    //           let cardType = this.gameState.config.cardTypes.find(x => x.id === libraryCard.cardTypeId);
    //           if (cardType.moveAfterTriggeringEffect) {
    //               let finalDestinationZone = this.gameState.config.gameZones.find(x => x.id === cardType.zoneId);
    //               this.doEffect(card, this.createMoveEffect(destinationZone, finalDestinationZone.zoneEnum), targetInfo);
    //           }
    //       }
    //   }
    EffectSolver.prototype.createMoveEffect = function (originZoneEnum, destinationZoneEnum) {
        var effect = new MoveCardEffect_1.default();
        effect.originZoneEnum = originZoneEnum;
        effect.destinationZoneEnum = destinationZoneEnum;
        return effect;
    };
    //   createFightEffect(): Effect {
    //       let targetTypes: TargetType[] = [];
    //       let effectValues: EffectValue[] = [];
    //       effectValues.push(new EffectValue(EffectValueType.DamageToAttackedCard, 0, []));
    //       effectValues.push(new EffectValue(EffectValueType.DamageToAttackingCard, 0, []
    //         effectValues.push(new EffectValue(EffectValueType.AttackedCardDamagePrevented, 0, []));
    //         effectValues.push(new EffectValue(EffectValueType.AttackingCardDamagePrevented, 0, []));
    //         return EffectFactory.createEffect(EffectType.NormalAttack, effectValues, targetTypes).getEffect();
    //   }
    EffectSolver.prototype.createFightTargetInfoList = function (attackedCardInstanceId) {
        var attackedCardList = [attackedCardInstanceId];
        var attackedCardTargetInfo = new TargetInfo_1.default(attackedCardList, [], false, false, false);
        var tempTargetInfo = [attackedCardTargetInfo];
        return tempTargetInfo;
    };
    EffectSolver.prototype.createUpgradeEffect = function (upgradeLevel) {
        return new UpgradeCardEffect_1.default(upgradeLevel);
    };
    //   setDestroyConditions(card: RuntimeCard) {
    //     let cardType = card.cardType;
    //     for (let condition of cardType.destroyConditions) {
    //       if (condition instanceof StatDestroyCardCondition) {
    //         let statCondition = condition;
    //         card.stats[statCondition.statId].onValueChanged = (
    //           oldValue,
    //           newValue
    //         ) => {
    //           if (statCondition.isTrue(card)) {
    //             this.moveCard(
    //               card.ownerPlayer.netId,
    //               card,
    //               card.residingZone.zoneEnum,
    //               ZoneEnum.Graveyard
    //             );
    //           }
    //         };
    //       }
    //     }
    //   }
    EffectSolver.prototype.areAllTargetsAvailable = function (effect, sourceCard, targets) {
        return effect.areTargetsAvailable(this.gameState, sourceCard, targets);
    };
    EffectSolver.prototype.getRandomNumber = function (max) {
        return Math.floor(Math.random() * max);
    };
    EffectSolver.prototype.getRandomNumberInRange = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    EffectSolver.prototype.doEffect = function (sourceCard, effect, targetInfoList) {
        var success = effect.preEffect(this.gameState, sourceCard, targetInfoList);
        if (!success)
            return;
        for (var _i = 0, _a = this.gameState.players; _i < _a.length; _i++) {
            var p = _a[_i];
            var _loop_1 = function (zone) {
                var zoneDefinition = this_1.gameState.gameManager.gameProperties.gameZones.find(function (x) { return x.zoneEnum === zone.zoneEnum; });
                if (zoneDefinition.type === Zone_1.ZoneType.Dynamic) {
                    zone.preResolveEffect(effect, sourceCard, this_1.gameState, targetInfoList);
                }
            };
            var this_1 = this;
            for (var _b = 0, _c = p.zones; _b < _c.length; _b++) {
                var zone = _c[_b];
                _loop_1(zone);
            }
        }
        effect.resolve(this.gameState, sourceCard, targetInfoList);
        for (var _d = 0, _e = this.gameState.players; _d < _e.length; _d++) {
            var p = _e[_d];
            var _loop_2 = function (zone) {
                var zoneDefinition = this_2.gameState.gameManager.gameProperties.gameZones.find(function (x) { return x.zoneEnum === zone.zoneEnum; });
                if (zoneDefinition.type === Zone_1.ZoneType.Dynamic) {
                    zone.postResolveEffect(effect, sourceCard, this_2.gameState, targetInfoList);
                }
            };
            var this_2 = this;
            for (var _f = 0, _g = p.zones; _f < _g.length; _f++) {
                var zone = _g[_f];
                _loop_2(zone);
            }
        }
        this.updateStatBuffs();
    };
    EffectSolver.prototype.updateStatBuffs = function () {
        // update stat buffs
        // this bit just iterates through all stats - until marker
        for (var _i = 0, _a = this.gameState.players; _i < _a.length; _i++) {
            var statPlayer = _a[_i];
            for (var _b = 0, _c = statPlayer.zones.filter(function (z) {
                return Zone_1.ZoneEnumMethods.isBoard(z.zoneEnum);
            }); _b < _c.length; _b++) {
                var statZone = _c[_b];
                // this returns just the boards
                for (var _d = 0, _e = statZone.cards; _d < _e.length; _d++) {
                    var statCard = _e[_d];
                    for (var _f = 0, _g = statCard.getStatList(); _f < _g.length; _f++) {
                        var stat = _g[_f];
                        // marker - now we've got a stat
                        // from here, we're going to iterate through all keywords and see if they want to affect our stat
                        // first, we'll keep a record of the current effective value, because if it changes we want
                        // to call an onValueChanged for the stat
                        var oldEffectiveValue = stat.effectiveValue;
                        // have to clear them before we add
                        stat.buffs = [];
                        // now we do our big loop with everything
                        for (var _h = 0, _j = this.gameState.players; _h < _j.length; _h++) {
                            var player = _j[_h];
                            for (var _k = 0, _l = player.zones.filter(function (z) {
                                return Zone_1.ZoneEnumMethods.isBoard(z.zoneEnum);
                            }); _k < _l.length; _k++) {
                                var zone = _l[_k];
                                for (var _m = 0, _o = zone.enchantments; _m < _o.length; _m++) {
                                    var enchantment = _o[_m];
                                    for (var _p = 0, _q = enchantment.runtimeKeywords; _p < _q.length; _p++) {
                                        var keyword = _q[_p];
                                        var outBuff = keyword.addStatBuff(stat, statCard, this.gameState);
                                        if (outBuff !== null) {
                                            stat.addBuff(outBuff.value, outBuff.details);
                                        }
                                    }
                                }
                                for (var _r = 0, _s = zone.cards; _r < _s.length; _r++) {
                                    var card = _s[_r];
                                    for (var _t = 0, _u = card.runtimeKeywords; _t < _u.length; _t++) {
                                        var keyword = _u[_t];
                                        var outBuff = keyword.addStatBuff(stat, statCard, this.gameState);
                                        if (outBuff !== null) {
                                            stat.addBuff(outBuff.value, outBuff.details);
                                        }
                                    }
                                    for (var _v = 0, _w = card.enchantments; _v < _w.length; _v++) {
                                        var enchantment = _w[_v];
                                        for (var _x = 0, _y = enchantment.runtimeKeywords; _x < _y.length; _x++) {
                                            var keyword = _y[_x];
                                            var outBuff = keyword.addStatBuff(stat, statCard, this.gameState);
                                            if (outBuff !== null) {
                                                stat.addBuff(outBuff.value, outBuff.details);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        var outString = '';
                        for (var _z = 0, _0 = stat.buffs; _z < _0.length; _z++) {
                            var buff = _0[_z];
                            outString += buff.details;
                        }
                        // call the action - this should presumable update everything important as well
                        if (stat.effectiveValue !== oldEffectiveValue &&
                            stat.onValueChanged !== null) {
                            stat.onValueChanged(oldEffectiveValue, stat.effectiveValue);
                        }
                    }
                }
            }
        }
    };
    return EffectSolver;
}());
exports.default = EffectSolver;
