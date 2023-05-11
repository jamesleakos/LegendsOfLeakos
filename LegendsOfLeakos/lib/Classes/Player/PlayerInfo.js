"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Zone_1 = require("../../Enums/Zone");
var LandAndBiome_1 = require("../../Enums/LandAndBiome");
var PayResourceCost_1 = __importDefault(require("../PayResourceCost/PayResourceCost"));
var RuntimeRealm_1 = __importDefault(require("../RealmsAndLand/Realm/RuntimeRealm"));
var PlayerInfo = /** @class */ (function () {
    function PlayerInfo() {
        this.stats = [];
        this.realm = new RuntimeRealm_1.default();
    }
    PlayerInfo.prototype.getCardFromInstanceId = function (cardInstanceId) {
        for (var _i = 0, _a = this.zones; _i < _a.length; _i++) {
            var zone = _a[_i];
            var tempCard = zone.cards.find(function (x) { return x.instanceId === cardInstanceId; });
            if (tempCard !== undefined) {
                return tempCard;
            }
        }
        return null;
    };
    PlayerInfo.prototype.getAllFriendlyCardsInPlay = function () {
        var cardList = new Array();
        6;
        cardList.push.apply(cardList, this.getFriendlyZoneFromEnum(Zone_1.ZoneEnum.BackBoard).cards);
        cardList.push.apply(cardList, this.getFriendlyZoneFromEnum(Zone_1.ZoneEnum.FrontBoard).cards);
        cardList.push.apply(cardList, this.getFriendlyZoneFromEnum(Zone_1.ZoneEnum.BattleBoard).cards);
        return cardList;
    };
    PlayerInfo.prototype.getFriendlyZoneContainingCard = function (cardInstanceId) {
        var board = 2;
        for (var _i = 0, _a = this.zones; _i < _a.length; _i++) {
            var zone = _a[_i];
            var tempCard = zone.cards.find(function (x) { return x.instanceId === cardInstanceId; });
            if (tempCard !== undefined) {
                board = zone.zoneId;
            }
        }
        return board;
    };
    PlayerInfo.prototype.getZoneFromInstanceId = function (zoneInstanceId) {
        return this.zones.find(function (c) { return c.instanceId === zoneInstanceId; });
    };
    PlayerInfo.prototype.getFriendlyZoneFromEnum = function (zoneEnum) {
        return this.zones.find(function (c) { return c.zoneEnum === zoneEnum; });
    };
    PlayerInfo.prototype.getFriendlyZoneFromZoneId = function (zoneZoneId) {
        return this.zones.find(function (c) { return c.zoneId === zoneZoneId; });
    };
    PlayerInfo.prototype.setPlayerManaFromLand = function () {
        this.nameToStat.get('ForestMana').baseValue = 0;
        this.nameToStat.get('OceanMana').baseValue = 0;
        this.nameToStat.get('DesertMana').baseValue = 0;
        this.nameToStat.get('MountainMana').baseValue = 0;
        this.nameToStat.get('PrairieMana').baseValue = 0;
        this.nameToStat.get('FellsMana').baseValue = 0;
        this.nameToStat.get('TundraMana').baseValue = 0;
        for (var _i = 0, _a = this.landTiles; _i < _a.length; _i++) {
            var landTile = _a[_i];
            if (landTile.explored) {
                switch (landTile.landType) {
                    case LandAndBiome_1.LandType.forest:
                        this.nameToStat.get('ForestMana').baseValue += 1;
                        break;
                    case LandAndBiome_1.LandType.ocean:
                        this.nameToStat.get('OceanMana').baseValue += 1;
                        break;
                    case LandAndBiome_1.LandType.desert:
                        this.nameToStat.get('DesertMana').baseValue += 1;
                        break;
                    case LandAndBiome_1.LandType.mountain:
                        this.nameToStat.get('MountainMana').baseValue += 1;
                        break;
                    case LandAndBiome_1.LandType.prairie:
                        this.nameToStat.get('PrairieMana').baseValue += 1;
                        break;
                    case LandAndBiome_1.LandType.fells:
                        this.nameToStat.get('FellsMana').baseValue += 1;
                        break;
                    case LandAndBiome_1.LandType.tundra:
                        this.nameToStat.get('TundraMana').baseValue += 1;
                        break;
                }
            }
        }
    };
    PlayerInfo.prototype.payResourceCosts = function (costs, goalManaSpend) {
        var _this = this;
        if (goalManaSpend === void 0) { goalManaSpend = null; }
        if (!this.canPayResourceCosts(costs)) {
            console.log('CANNOT PAY COSTS');
            return null;
        }
        var outList = new Array();
        for (var _i = 0, costs_1 = costs; _i < costs_1.length; _i++) {
            var cost = costs_1[_i];
            if (this.nameToStat.get('AnyMana').statId !== cost.statId) {
                this._payResourceCost(this.idToStat.get(cost.statId), cost.value, outList);
            }
        }
        var anyCost = costs.find(function (x) { return x.statId === _this.nameToStat.get('AnyMana').statId; });
        if (anyCost !== undefined) {
            var anyValueRemaining = anyCost.value;
            if (goalManaSpend !== null) {
                for (var _a = 0, goalManaSpend_1 = goalManaSpend; _a < goalManaSpend_1.length; _a++) {
                    var cost = goalManaSpend_1[_a];
                    if (anyValueRemaining > 0) {
                        this._payResourceCost(this.idToStat.get(cost.statId), Math.min(anyValueRemaining, cost.value), outList);
                        anyValueRemaining -= cost.value;
                    }
                }
            }
            for (var _b = 0, _c = this.stats; _b < _c.length; _b++) {
                var stat = _c[_b];
                if (anyValueRemaining > 0) {
                    if (this.nameToStat.get('Life').statId !== stat.statId) {
                        var reduceBy = Math.min(anyValueRemaining, stat.effectiveValue);
                        this._payResourceCost(stat, reduceBy, outList);
                        anyValueRemaining -= reduceBy;
                    }
                }
            }
        }
        return outList;
    };
    PlayerInfo.prototype._payResourceCost = function (stat, cost, outlist) {
        // Pay the cost from this playerInfo's stats
        stat.baseValue -= cost;
        // Add the payment to the outlist
        // Check if this stat has already been used in outlist
        var tempCost = outlist.find(function (c) { return c.statId === stat.statId; });
        // If not, add it
        if (tempCost === undefined) {
            var newCost = new PayResourceCost_1.default(stat.statId, cost);
            outlist.push(newCost);
        }
        // If so, just increase the value
        else {
            tempCost.value += cost;
        }
    };
    PlayerInfo.prototype.canPayResourceCosts = function (costs) {
        var _this = this;
        var availableResources = [];
        for (var _i = 0, _a = this.stats; _i < _a.length; _i++) {
            var playerResource = _a[_i];
            var tempPRC = new PayResourceCost_1.default(playerResource.statId, playerResource.effectiveValue);
            availableResources.push(tempPRC);
        }
        var _loop_1 = function (cost) {
            if (this_1.nameToStat.get('AnyMana').statId !== cost.statId) {
                var availableResource = availableResources.find(function (ar) { return ar.statId === cost.statId; });
                if (availableResource && availableResource.value < cost.value) {
                    return { value: false };
                }
                if (availableResource) {
                    availableResource.value -= cost.value;
                }
            }
        };
        var this_1 = this;
        for (var _b = 0, costs_2 = costs; _b < costs_2.length; _b++) {
            var cost = costs_2[_b];
            var state_1 = _loop_1(cost);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        var remainingMana = 0;
        for (var _c = 0, availableResources_1 = availableResources; _c < availableResources_1.length; _c++) {
            var c = availableResources_1[_c];
            if (c.statId !== this.nameToStat.get('Life').statId) {
                remainingMana += c.value;
            }
        }
        var anyCost = costs.find(function (x) { return x.statId === _this.nameToStat.get('AnyMana').statId; });
        if (anyCost !== undefined) {
            if (anyCost.value > remainingMana) {
                return false;
            }
        }
        return true;
    };
    return PlayerInfo;
}());
exports.default = PlayerInfo;
