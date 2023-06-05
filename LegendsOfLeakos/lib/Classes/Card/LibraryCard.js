"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LibraryKeyword_1 = __importDefault(require("../Keyword/LibraryKeyword"));
var ActivatedAbility_1 = __importDefault(require("../Ability/ActivatedAbility"));
var BattlecryAbility_1 = __importDefault(require("../Ability/BattlecryAbility"));
var PayResourceCost_1 = __importDefault(require("../PayResourceCost/PayResourceCost"));
var CardUpgrade_1 = __importDefault(require("./CardUpgrade"));
var DeckRequirement_1 = __importDefault(require("../DeckRequirement/DeckRequirement"));
var LandAndBiome_1 = require("../../Enums/LandAndBiome");
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
    LibraryCard.prototype.toJSON = function () {
        return {
            libraryId: this.libraryId,
            cardTypeId: this.cardTypeId,
            name: this.name,
            biomeType: this.biomeType.toString(),
            biomeDepth: this.biomeDepth.toString(),
            cardText: this.cardText,
            imageName: this.imageName,
            attack: this.attack.toJSON(),
            health: this.health.toJSON(),
            priority: this.priority.toJSON(),
            costs: this.costs.map(function (c) { return c.toJSON(); }),
            deckRequirements: this.deckRequirements.map(function (c) { return c.toJSON(); }),
            libraryKeywords: this.libraryKeywords.map(function (c) { return c.toJSON(); }),
            activatedAbilities: this.activatedAbilities.map(function (c) { return c.toJSON(); }),
            battlecryAbilities: this.battlecryAbilities.map(function (c) { return c.toJSON(); }),
            cardUpgrades: this.cardUpgrades.map(function (c) { return c.toJSON(); }),
        };
    };
    LibraryCard.fromJSON = function (json) {
        var newCard = new LibraryCard();
        newCard.libraryId = json.libraryId;
        newCard.cardTypeId = json.cardTypeId;
        newCard.name = json.name;
        newCard.biomeType = LandAndBiome_1.BiomeType[json.biomeType];
        newCard.biomeDepth = LandAndBiome_1.BiomeDepth[json.biomeDepth];
        newCard.cardText = json.cardText;
        newCard.imageName = json.imageName;
        newCard.attack = json.attack;
        newCard.health = json.health;
        newCard.priority = json.priority;
        for (var _i = 0, _a = json.costs; _i < _a.length; _i++) {
            var c = _a[_i];
            newCard.costs.push(PayResourceCost_1.default.fromJSON(c));
        }
        for (var _b = 0, _c = json.deckRequirements; _b < _c.length; _b++) {
            var c = _c[_b];
            newCard.deckRequirements.push(DeckRequirement_1.default.fromJSON(c));
        }
        for (var _d = 0, _e = json.libraryKeywords; _d < _e.length; _d++) {
            var c = _e[_d];
            newCard.libraryKeywords.push(LibraryKeyword_1.default.fromJSON(c));
        }
        for (var _f = 0, _g = json.activatedAbilities; _f < _g.length; _f++) {
            var c = _g[_f];
            newCard.activatedAbilities.push(ActivatedAbility_1.default.fromJSON(c));
        }
        for (var _h = 0, _j = json.battlecryAbilities; _h < _j.length; _h++) {
            var c = _j[_h];
            newCard.battlecryAbilities.push(BattlecryAbility_1.default.fromJSON(c));
        }
        for (var _k = 0, _l = json.cardUpgrades; _k < _l.length; _k++) {
            var c = _l[_k];
            newCard.cardUpgrades.push(CardUpgrade_1.default.fromJSON(c));
        }
        return newCard;
    };
    return LibraryCard;
}());
exports.default = LibraryCard;
