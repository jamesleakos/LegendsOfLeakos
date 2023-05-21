"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//
// In-game entry point to all data outside of game state.
// Includes hard-coded data from constants.properties, as well as library data from the database
var GameManager = /** @class */ (function () {
    function GameManager() {
        // properties
        this.gameProperties = {};
        // library objects
        this.cardLibrary = [];
        this.enchantmentLibrary = [];
    }
    // methods
    GameManager.prototype.getCardFromLibraryId = function (libraryId) {
        var card = this.cardLibrary.find(function (x) { return x.libraryId === libraryId; });
        if (card === undefined) {
            throw new Error("Could not find card with libraryId ".concat(libraryId));
        }
        return card;
    };
    GameManager.prototype.getEnchantmentFromLibraryId = function (libraryId) {
        var enchantment = this.enchantmentLibrary.find(function (x) { return x.libraryId === libraryId; });
        if (enchantment === undefined) {
            throw new Error("Could not find enchantment with libraryId ".concat(libraryId));
        }
        return enchantment;
    };
    return GameManager;
}());
exports.default = GameManager;
