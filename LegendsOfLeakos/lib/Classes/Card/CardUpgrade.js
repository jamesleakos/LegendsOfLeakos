"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ActivatedAbilityUpgrade_1 = __importDefault(require("../Ability/ActivatedAbilityUpgrade"));
var PayResourceCost_1 = __importDefault(require("../PayResourceCost/PayResourceCost"));
PayResourceCost_1.default;
var StatUpgrade_1 = __importDefault(require("../Stat/StatUpgrade"));
var KeywordUpgrade_1 = __importDefault(require("../Keyword/KeywordUpgrade"));
var CardUpgrade = /** @class */ (function () {
    function CardUpgrade() {
        this.costs = [];
        this.upgradeNeighbors = [];
        this.keywordUpgrades = [];
        this.activatedAbilityUpgrades = [];
    }
    CardUpgrade.prototype.potentialNeighbors = function (gameManager) {
        var width = gameManager.gameProperties.upgradeTreeShape.width;
        var tempList = [];
        tempList.push(this.upgradeIndex - width);
        tempList.push(this.upgradeIndex - 1);
        tempList.push(this.upgradeIndex + 1);
        tempList.push(this.upgradeIndex + width);
        return tempList;
    };
    CardUpgrade.prototype.upgradeCard = function (card) {
        var attack = card.attack;
        if (attack)
            this.attackStatUpgrade.upgradeStat(attack);
        var life = card.health;
        if (life)
            this.lifeStatUpgrade.upgradeStat(life);
        var priority = card.priority;
        if (priority)
            this.priorityStatUpgrade.upgradeStat(priority);
        var _loop_1 = function (k) {
            var keyword = card.runtimeKeywords.find(function (c) { return c.keywordType === k.keywordType; });
            if (keyword)
                k.upgradeKeyword(keyword);
        };
        for (var _i = 0, _a = this.keywordUpgrades; _i < _a.length; _i++) {
            var k = _a[_i];
            _loop_1(k);
        }
        for (var _b = 0, _c = this.activatedAbilityUpgrades; _b < _c.length; _b++) {
            var a = _c[_b];
            if (card.activatedAbilities.length >= a.abilityUpgradeIndex)
                continue;
            a.upgradeAbility(card.activatedAbilities[a.abilityUpgradeIndex]);
        }
        card.upgradesApplied.push(this.upgradeIndex);
    };
    CardUpgrade.fromJSON = function (json) {
        var newCardUpgrade = new CardUpgrade();
        newCardUpgrade.name = json.name;
        newCardUpgrade.upgradeIndex = json.upgradeIndex;
        newCardUpgrade.isStartingUpgrade = json.isStartingUpgrade;
        newCardUpgrade.description = json.description;
        newCardUpgrade.attackStatUpgrade = StatUpgrade_1.default.fromJSON(json.attackStatUpgrade);
        newCardUpgrade.lifeStatUpgrade = StatUpgrade_1.default.fromJSON(json.lifeStatUpgrade);
        newCardUpgrade.priorityStatUpgrade = StatUpgrade_1.default.fromJSON(json.priorityStatUpgrade);
        for (var _i = 0, _a = json.costs; _i < _a.length; _i++) {
            var c = _a[_i];
            newCardUpgrade.costs.push(PayResourceCost_1.default.fromJSON(c));
        }
        for (var _b = 0, _c = json.keywordUpgrades; _b < _c.length; _b++) {
            var c = _c[_b];
            newCardUpgrade.keywordUpgrades.push(KeywordUpgrade_1.default.fromJSON(c));
        }
        for (var _d = 0, _e = json.activatedAbilityUpgrades; _d < _e.length; _d++) {
            var c = _e[_d];
            newCardUpgrade.activatedAbilityUpgrades.push(ActivatedAbilityUpgrade_1.default.fromJSON(c));
        }
        return newCardUpgrade;
    };
    return CardUpgrade;
}());
exports.default = CardUpgrade;
