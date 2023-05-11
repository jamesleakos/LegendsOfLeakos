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
Object.defineProperty(exports, "__esModule", { value: true });
var EntityEffect = /** @class */ (function (_super) {
    __extends(EntityEffect, _super);
    function EntityEffect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EntityEffect.prototype.MyRequiredEffectValues = function () {
        var tempList = [];
        for (var _i = 0, _a = _super.prototype.MyRequiredEffectValues.call(this); _i < _a.length; _i++) {
            var x = _a[_i];
            tempList.push(x);
        }
        return tempList;
    };
    EntityEffect.prototype.IsTargetInfoStillValid = function (sourceEntity, state, targetInfo, targetType) {
        var validCount = 0;
        if (targetType.targetTypeEnum.BroadTargetType() === BroadTargetTypeEnum.card) {
            // check if there are too many targets
            if (targetInfo.cardInstanceIdList.length > targetType.maxSelectionsAllowed)
                return false;
            for (var _i = 0, _a = targetInfo.cardInstanceIdList; _i < _a.length; _i++) {
                var j = _a[_i];
                var card = state.GetCardFromAnywhere(j);
                if (card === null)
                    continue;
                // checking if the targetTypeEnum is correct
                switch (targetType.targetTypeEnum) {
                    case TargetTypeEnum.TargetCreature:
                        break;
                    case TargetTypeEnum.TargetOpponentCreature:
                        if (card.ownerPlayer === sourceEntity.ownerPlayer)
                            continue;
                        break;
                    case TargetTypeEnum.TargetFriendlyCreature:
                        if (card.ownerPlayer !== sourceEntity.ownerPlayer)
                            continue;
                        break;
                    default:
                        console.log('ERROR: missing conversion');
                        continue;
                }
                // checking if the target satisfies the conditions
                for (var _b = 0, _c = targetType.conditions; _b < _c.length; _b++) {
                    var c = _c[_b];
                    if (!(c instanceof CardCondition))
                        continue;
                    if (!c.IsTrue(card))
                        continue;
                }
                // count to satisfy min and max
                validCount += 1;
            }
        }
        else if (targetType.targetTypeEnum.BroadTargetType() === BroadTargetTypeEnum.zone) {
            // check if there are too many targets
            if (targetInfo.zoneInstanceIdList.length > targetType.maxSelectionsAllowed)
                return false;
            for (var _d = 0, _e = targetInfo.zoneInstanceIdList; _d < _e.length; _d++) {
                var zoneInstanceId = _e[_d];
                var zone = state.GetZone(zoneInstanceId);
                if (zone === null)
                    continue;
                // checking if the targetTypeEnum is correct
                switch (targetType.targetTypeEnum) {
                    case TargetTypeEnum.TargetRow:
                        // I think this is always fine?
                        break;
                    case TargetTypeEnum.TargetOpponentRow:
                        if (zone.ownerPlayer === sourceEntity.ownerPlayer)
                            continue;
                        break;
                    case TargetTypeEnum.TargetFriendlyRow:
                        if (zone.ownerPlayer !== sourceEntity.ownerPlayer)
                            continue;
                        break;
                    case TargetTypeEnum.OpponentFrontRow:
                        if (zone.ownerPlayer === sourceEntity.ownerPlayer ||
                            zone.name !== 'FrontRow')
                            continue;
                        break;
                    case TargetTypeEnum.OpponentBackRow:
                        if (zone.ownerPlayer === sourceEntity.ownerPlayer ||
                            zone.name !== 'BackRow')
                            continue;
                        break;
                    case TargetTypeEnum.FriendlyFrontRow:
                        if (zone.ownerPlayer !== sourceEntity.ownerPlayer ||
                            zone.name !== 'FrontRow')
                            continue;
                        break;
                    case TargetTypeEnum.FriendlyBackRow:
                        if (zone.ownerPlayer !== sourceEntity.ownerPlayer ||
                            zone.name !== 'BackRow')
                            continue;
                        break;
                    default:
                        throw new Error('missing conversion');
                }
                // checking if the target satisfies the conditions
                for (var _f = 0, _g = targetType.conditions; _f < _g.length; _f++) {
                    var c = _g[_f];
                    if (!(c instanceof ZoneCondition))
                        continue;
                    if (!c.IsTrue(zone))
                        continue;
                }
                // count to satisfy min and max
                validCount += 1;
            }
        }
        // check min conditions
        return validCount >= targetType.minSelectionsThatMustRemain;
    };
    EntityEffect.prototype.AreAllSelectedTargetInfoItemsValid = function (sourceEntity, state, targetInfo, targetTypes) {
        if (targetTypes.length !== targetInfo.length)
            return false;
        for (var i = 0; i < targetInfo.length; i++) {
            if (targetInfo[i].noTargetWasSelected)
                continue;
            if (!this.IsTargetInfoStillValid(sourceEntity, state, targetInfo[i], targetTypes[i]))
                return false;
        }
        return true;
    };
    EntityEffect.prototype.IsCardStillInPlay = function (entity) {
        if (entity.residingZone.name === 'BattleBoard' ||
            entity.residingZone.name === 'FrontBoard' ||
            entity.residingZone.name === 'BackBoard')
            return true;
        return false;
    };
    EntityEffect.prototype.Resolve = function (state, sourceEntity, targetInfoList) {
        // override this
    };
    EntityEffect.prototype.AreTargetsAvailable = function (state, sourceEntity, targetTypes) {
        var cards = [];
        var zones = [];
        for (var _i = 0, targetTypes_1 = targetTypes; _i < targetTypes_1.length; _i++) {
            var targetType = targetTypes_1[_i];
            if (targetType.minSelectionsRequired > 0) {
                switch (targetType.GetTargetType()) {
                    case TargetTypeEnum.TargetCreature:
                        for (var _a = 0, _b = state.players; _a < _b.length; _a++) {
                            var player = _b[_a];
                            for (var _c = 0, _d = player.zones; _c < _d.length; _c++) {
                                var zone = _d[_c];
                                for (var _e = 0, _f = zone.cards; _e < _f.length; _e++) {
                                    var card = _f[_e];
                                    cards.push(card);
                                }
                            }
                        }
                        break;
                    case TargetTypeEnum.TargetFriendlyCreature:
                        for (var _g = 0, _h = state.players.find(function (c) { return c.id === sourceEntity.ownerPlayer.id; }).zones; _g < _h.length; _g++) {
                            var zone = _h[_g];
                            for (var _j = 0, _k = zone.cards; _j < _k.length; _j++) {
                                var card = _k[_j];
                                cards.push(card);
                            }
                        }
                        break;
                    case TargetTypeEnum.TargetOpponentCreature:
                        for (var _l = 0, _m = state.players.find(function (c) { return c.id !== sourceEntity.ownerPlayer.id; }).zones; _l < _m.length; _l++) {
                            var zone = _m[_l];
                            for (var _o = 0, _p = zone.cards; _o < _p.length; _o++) {
                                var card = _p[_o];
                                cards.push(card);
                            }
                        }
                        break;
                    case TargetTypeEnum.TargetRow:
                        for (var _q = 0, _r = state.players; _q < _r.length; _q++) {
                            var player = _r[_q];
                            for (var _s = 0, _t = player.zones; _s < _t.length; _s++) {
                                var zone = _t[_s];
                                zones.push(zone);
                            }
                        }
                        break;
                    case TargetTypeEnum.TargetFriendlyRow:
                        for (var _u = 0, _v = state.players.find(function (c) { return c.netId === sourceEntity.ownerPlayer.netId; }).zones; _u < _v.length; _u++) {
                            var zone = _v[_u];
                            zones.push(zone);
                        }
                        break;
                    case TargetTypeEnum.TargetOpponentRow:
                        for (var _w = 0, _x = state.players.find(function (c) { return c.netId !== sourceEntity.ownerPlayer.netId; }).zones; _w < _x.length; _w++) {
                            var zone = _x[_w];
                            zones.push(zone);
                        }
                        break;
                    default:
                        throw new Error('Case Not Implemented');
                }
                var goodTargetExists = true;
                for (var _y = 0, cards_1 = cards; _y < cards_1.length; _y++) {
                    var card = cards_1[_y];
                    var cardGood = true;
                    for (var _z = 0, _0 = targetType.conditions; _z < _0.length; _z++) {
                        var condition = _0[_z];
                        switch (condition.constructor) {
                            case CardCondition:
                                if (!condition.IsTrue(card))
                                    cardGood = false;
                                break;
                            default:
                                throw new Error('Case not implemented here');
                        }
                    }
                    if (!cardGood)
                        goodTargetExists = false;
                }
                for (var _1 = 0, zones_1 = zones; _1 < zones_1.length; _1++) {
                    var zone = zones_1[_1];
                    var zoneGood = true;
                    for (var _2 = 0, _3 = targetType.conditions; _2 < _3.length; _2++) {
                        var condition = _3[_2];
                        switch (condition.constructor) {
                            case ZoneCondition:
                                if (!condition.IsTrue(zone))
                                    zoneGood = false;
                                break;
                            default:
                                throw new Error('Not implemented');
                        }
                    }
                    if (!zoneGood)
                        goodTargetExists = false;
                }
                if (!goodTargetExists)
                    return false;
            }
        }
        return true;
    };
    return EntityEffect;
}(Effect));
exports.default = EntityEffect;
