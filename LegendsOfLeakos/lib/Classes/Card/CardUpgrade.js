"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var PayResourceCost_1 = __importDefault(require("../PayResourceCost/PayResourceCost"));
PayResourceCost_1.default;
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
    return CardUpgrade;
}());
exports.default = CardUpgrade;
