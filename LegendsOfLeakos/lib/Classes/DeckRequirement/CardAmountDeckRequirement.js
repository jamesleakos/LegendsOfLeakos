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
var DeckRequirement_1 = __importDefault(require("./DeckRequirement"));
var DeckRequirements_1 = require("../../Enums/DeckRequirements");
var CardDeckRequirement = /** @class */ (function (_super) {
    __extends(CardDeckRequirement, _super);
    function CardDeckRequirement(libraryId, amount) {
        var _this = _super.call(this) || this;
        _this.title = 'Card Req';
        _this.reqValues.set(DeckRequirements_1.DeckReqVariableNames.Amount, amount);
        _this.reqValues.set(DeckRequirements_1.DeckReqVariableNames.LibraryCardId, libraryId);
        return _this;
    }
    CardDeckRequirement.prototype.myRequiredValues = function () {
        return [DeckRequirements_1.DeckReqVariableNames.Amount, DeckRequirements_1.DeckReqVariableNames.LibraryCardId];
        return new DeckRequirementReturnTypes(mainList, stringList, intAndEnumList);
    };
    CardDeckRequirement.prototype.canBeAdded = function (biome, myCard) {
        return this.IsRequirementMet(biome, myCard.libraryId);
    };
    CardDeckRequirement.prototype.isRequirementMet = function (biome, myCardLibraryId) {
        var _this = this;
        var counter = 0;
        var deckEntry = biome.deck.cards.find(function (c) { return c.libraryId === _this.reqValues.get(DeckRequirements_1.DeckReqVariableNames.libraryId); });
        if (deckEntry !== undefined) {
            counter += deckEntry.amount;
        }
        for (var _i = 0, _a = biome.subBiomes; _i < _a.length; _i++) {
            var subbiome = _a[_i];
            var subDeckEntry = subbiome.deck.cards.find(function (c) {
                return c.libraryId === _this.reqValues.get(DeckRequirements_1.DeckReqVariableNames.libraryId);
            });
            if (subDeckEntry !== undefined) {
                counter += subDeckEntry.amount;
            }
        }
        return counter >= this.reqValues.get(DeckRequirements_1.DeckReqVariableNames.amount);
    };
    CardDeckRequirement.prototype.requirementToText = function () {
        var _this = this;
        return (this.reqValues.get(DeckRequirements_1.DeckReqVariableNames.amount).toString() +
            ' of ' +
            GameManager.Instance.config.cards.find(function (c) {
                return c.libraryId === _this.reqValues.get(DeckRequirements_1.DeckReqVariableNames.libraryId);
            }).name.value);
    };
    return CardDeckRequirement;
}(DeckRequirement_1.default));
