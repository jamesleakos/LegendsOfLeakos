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
var AbilityKeywordRuntimeEntity_1 = __importDefault(require("../Entity/AbilityKeywordRuntimeEntity"));
var RuntimeKeyword_1 = __importDefault(require("../Keyword/RuntimeKeyword"));
var ActivatedAbility_1 = __importDefault(require("../Ability/ActivatedAbility"));
var Effect_1 = __importDefault(require("../Effect/Effect"));
var RuntimeEnchantment = /** @class */ (function (_super) {
    __extends(RuntimeEnchantment, _super);
    function RuntimeEnchantment(libraryID, enchantmentLibrary, instanceId, creatingEntity, creatingPlayer, runtimeKeywords, abilities, residingZone, residingCard) {
        if (residingCard === void 0) { residingCard = null; }
        var _this = _super.call(this) || this;
        _this.libraryID = libraryID;
        _this.ownerPlayer = creatingPlayer;
        _this.instanceId = instanceId;
        _this.residingZone = residingZone;
        _this.creatingEntity = creatingEntity;
        _this.residingCard = residingCard;
        var libraryEnchantment = enchantmentLibrary.find(function (c) { return c.libraryId === libraryID; });
        _this.name = libraryEnchantment.name;
        _this.imageName = libraryEnchantment.imageName;
        runtimeKeywords.forEach(function (keyword) {
            var keywordCopy = RuntimeKeyword_1.default.createRuntimeKeyword(_this.instanceId, keyword.keywordType, keyword.indexForUpgrades, keyword.description, keyword.isPermanent, keyword.duration, keyword.keywordValueList, keyword.isActive, keyword.conditions, keyword.imageName).keyword;
            keywordCopy.myEntity = _this;
            _this.runtimeKeywords.push(keywordCopy);
        });
        abilities.forEach(function (activatedAbility) {
            var abilityCopy = ActivatedAbility_1.default.createActivatedAbility(activatedAbility.indexForUpgrades, activatedAbility.name, Effect_1.default.createEffect(activatedAbility.effect.effectEnum, activatedAbility.effect.effectValueList, activatedAbility.effect.targetTypes).effect, activatedAbility.costs, activatedAbility.usesPerTurn, activatedAbility.usesRemaining, activatedAbility.usableInPhases, activatedAbility.isActive, activatedAbility.imageName);
            _this.activatedAbilities.push(abilityCopy);
        });
        return _this;
    }
    return RuntimeEnchantment;
}(AbilityKeywordRuntimeEntity_1.default));
exports.default = RuntimeEnchantment;
