"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LibraryCard = /** @class */ (function () {
    function LibraryCard() {
        this.costs = [];
        this.deckRequirements = [];
        this.libraryKeywords = [];
        this.activatedAbilities = [];
        this.battlecryAbilities = [];
        this.cardUpgrades = [];
    }
    LibraryCard.prototype.getCardUpgradeByUpgradeIndex = function (index) {
        return this.cardUpgrades.find(function (c) { return c.upgradeIndex === index; });
    };
    return LibraryCard;
}());
exports.default = LibraryCard;
