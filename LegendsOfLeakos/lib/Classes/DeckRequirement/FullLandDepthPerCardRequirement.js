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
var FullLandDepthPerCardRequirement = /** @class */ (function (_super) {
    __extends(FullLandDepthPerCardRequirement, _super);
    function FullLandDepthPerCardRequirement(biomeType, biomeDepth, perCardAmount, amount) {
        var _this = _super.call(this) || this;
        _this.title = 'Land per Card Req';
        _this.reqValues.set(DeckRequirements_1.DeckReqVariableNames.BiomeType, biomeType);
        _this.reqValues.set(DeckRequirements_1.DeckReqVariableNames.BiomeDepth, biomeDepth);
        _this.reqValues.set(DeckRequirements_1.DeckReqVariableNames.PerCardAmount, perCardAmount);
        _this.reqValues.set(DeckRequirements_1.DeckReqVariableNames.Amount, amount);
        return _this;
    }
    FullLandDepthPerCardRequirement.prototype.myRequiredValues = function () {
        return [
            DeckRequirements_1.DeckReqVariableNames.BiomeType,
            DeckRequirements_1.DeckReqVariableNames.BiomeDepth,
            DeckRequirements_1.DeckReqVariableNames.PerCardAmount,
            DeckRequirements_1.DeckReqVariableNames.Amount,
        ];
    };
    FullLandDepthPerCardRequirement.prototype.canBeAdded = function (myBiome, myCard) {
        return this.wouldRequirementBeMetAtSomeNumberOfMyCard(myBiome, myBiome.getCardsCountByLibraryID(myCard.libraryId) + 1);
    };
    FullLandDepthPerCardRequirement.prototype.isRequirementMet = function (myBiome, libraryCardID) {
        return this.wouldRequirementBeMetAtSomeNumberOfMyCard(myBiome, myBiome.getCardsCountByLibraryID(libraryCardID));
    };
    FullLandDepthPerCardRequirement.prototype.wouldRequirementBeMetAtSomeNumberOfMyCard = function (myBiome, numberOfMyCard) {
        var _this = this;
        if (myBiome.biomeType !== this.reqValues.get(DeckRequirements_1.DeckReqVariableNames.BiomeType))
            return false;
        var testingEntry;
        if (this.reqValues.get(DeckRequirements_1.DeckReqVariableNames.BiomeDepth).toString() === 'all') {
            testingEntry = myBiome;
        }
        else {
            var subEntry = myBiome.subBiomes.find(function (sb) {
                return sb.biomeDepth === _this.reqValues.get(DeckRequirements_1.DeckReqVariableNames.BiomeDepth);
            });
            if (subEntry === undefined)
                return false;
            testingEntry = subEntry;
        }
        if ((testingEntry.landTiles.length /
            this.reqValues.get(DeckRequirements_1.DeckReqVariableNames.Amount)) *
            this.reqValues.get(DeckRequirements_1.DeckReqVariableNames.PerCardAmount) <
            numberOfMyCard)
            return false;
        return true;
    };
    FullLandDepthPerCardRequirement.prototype.requirementToText = function (gameManager) {
        return (this.reqValues.get(DeckRequirements_1.DeckReqVariableNames.Amount) +
            ' of ' +
            this.reqValues.get(DeckRequirements_1.DeckReqVariableNames.BiomeDepth).toString() +
            ' ' +
            this.reqValues.get(DeckRequirements_1.DeckReqVariableNames.BiomeType).toString() +
            ' per ' +
            this.reqValues.get(DeckRequirements_1.DeckReqVariableNames.PerCardAmount));
    };
    return FullLandDepthPerCardRequirement;
}(DeckRequirement_1.default));
exports.default = FullLandDepthPerCardRequirement;
