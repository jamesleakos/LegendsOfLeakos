"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameState = /** @class */ (function () {
    function GameState(gameManager, players, effectSolver) {
        this.players = [];
        this.gameManager = gameManager;
        this.players = players;
        this.effectSolver = effectSolver;
        this.currentTurn = 0;
    }
    GameState.prototype.getCardFromAnywhere = function (cardInstanceId) {
        var tempCard = null;
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var playerInfo = _a[_i];
            tempCard = playerInfo.getCardFromInstanceId(cardInstanceId);
            if (tempCard != null)
                return tempCard;
        }
        return tempCard;
    };
    GameState.prototype.getZone = function (zoneInstanceId) {
        var tempZone = null;
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var playerInfo = _a[_i];
            tempZone = playerInfo.getZoneFromInstanceId(zoneInstanceId);
            if (tempZone != null)
                return tempZone;
        }
        return tempZone;
    };
    GameState.prototype.getEntityFromAnywhere = function (instanceId) {
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var playerInfo = _a[_i];
            for (var _b = 0, _c = playerInfo.zones; _b < _c.length; _b++) {
                var zone = _c[_b];
                if (zone.instanceId === instanceId)
                    return zone;
                for (var _d = 0, _e = zone.enchantments; _d < _e.length; _d++) {
                    var enchantment = _e[_d];
                    if (enchantment.instanceId === instanceId)
                        return enchantment;
                }
                for (var _f = 0, _g = zone.cards; _f < _g.length; _f++) {
                    var card = _g[_f];
                    if (card.instanceId === instanceId)
                        return card;
                    for (var _h = 0, _j = card.enchantments; _h < _j.length; _h++) {
                        var enchantment = _j[_h];
                        if (enchantment.instanceId === instanceId)
                            return enchantment;
                    }
                }
            }
        }
        console.log('did not find the entity');
        return null;
    };
    return GameState;
}());
exports.default = GameState;
