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
var ActivatedAbility_1 = __importDefault(require("../../../Ability/ActivatedAbility"));
var RuntimeEnchantment_1 = __importDefault(require("../../../Enchantment/RuntimeEnchantment"));
var RuntimeKeyword_1 = __importDefault(require("../../../Keyword/RuntimeKeyword"));
var Effect_1 = __importDefault(require("../../Effect"));
var GiveEnchantmentBaseEffect_1 = __importDefault(require("./GiveEnchantmentBaseEffect"));
var Effect_2 = require("../../../../Enums/Effect");
var TargetTypeInfo_1 = __importDefault(require("../../../Target/TargetTypeInfo"));
var EnchantCardEffect = /** @class */ (function (_super) {
    __extends(EnchantCardEffect, _super);
    function EnchantCardEffect(setEffectValues, setTargetTypes) {
        var _this = _super.call(this) || this;
        _this.effectEnum = Effect_2.EffectType.EnchantCard;
        _this.setEffectValueList(setEffectValues);
        _this.setTargetTypeList(setTargetTypes);
        return _this;
    }
    EnchantCardEffect.prototype.myRequiredEffectValues = function () {
        var tempList = [];
        for (var _i = 0, _a = _super.prototype.myRequiredEffectValues.call(this); _i < _a.length; _i++) {
            var x = _a[_i];
            tempList.push(x);
        }
        return tempList;
    };
    EnchantCardEffect.prototype.numberOfTargetTypes = function () {
        return 1;
    };
    EnchantCardEffect.prototype.targetTypeInfoList = function () {
        var list = [];
        list.push(new TargetTypeInfo_1.default('Targets To Be Enchanted', 'These are the units that are enchanted by this effect. At least one must remain in the targetableZoneIdList as of PreEffect to prevent sizzle', 'Targets must be cards', 1, null));
        return list;
    };
    EnchantCardEffect.prototype.effectToString = function (gameManager) {
        var outText = 'Enchant card with ' +
            gameManager.enchantmentLibrary[this.getEffectValue(Effect_2.EffectValueType.CreateEnchantmentEnchantmentLibraryID).setValue];
        return outText;
    };
    EnchantCardEffect.prototype.preEffect = function (state, sourceEntity, targetInfoList) {
        var targetsToBeEnchanted = targetInfoList[0];
        var enchantmentID = this.getEffectValue(Effect_2.EffectValueType.CreateEnchantmentEnchantmentLibraryID);
        enchantmentID.fitToTargetInfo(targetsToBeEnchanted);
        if (!this.isTargetInfoStillValid(sourceEntity, state, targetsToBeEnchanted, this.targetTypes[0]))
            return false;
        for (var i = 0; i < enchantmentID.modInts.length; i++) {
            enchantmentID.modInts[i].baseValue = enchantmentID.setValue;
        }
        return true;
    };
    EnchantCardEffect.prototype.resolve = function (state, sourceEntity, targetInfoList) {
        var cardsToEnchant = targetInfoList[0];
        var cardsToEnchantTargetType = this.targetTypes[0];
        if (!this.isTargetInfoStillValid(sourceEntity, state, cardsToEnchant, this.targetTypes[0]))
            return;
        var enchantmentLibID = this.getEffectValue(Effect_2.EffectValueType.CreateEnchantmentEnchantmentLibraryID);
        for (var i = 0; i < cardsToEnchant.cardInstanceIdList.length; i++) {
            var currentTargetCard = state.getCardFromAnywhere(cardsToEnchant.cardInstanceIdList[i]);
            if (!cardsToEnchantTargetType.cardSatisfiesConditions(currentTargetCard))
                break;
            var creatingPlayer = sourceEntity.ownerPlayer;
            var libraryEnchantment = state.gameManager.getEnchantmentFromLibraryId(enchantmentLibID.modInts[i].effectiveValue);
            var runtimeEnchantment = new RuntimeEnchantment_1.default(libraryEnchantment.libraryId, state.gameManager.enchantmentLibrary, creatingPlayer.currentEntityInstanceId++, sourceEntity, sourceEntity.ownerPlayer, [], [], currentTargetCard.residingZone, currentTargetCard);
            // add keywords
            for (var _i = 0, _a = libraryEnchantment.keywords; _i < _a.length; _i++) {
                var keyword = _a[_i];
                var keywordCopy = RuntimeKeyword_1.default.createRuntimeKeyword(runtimeEnchantment.instanceId, keyword.keywordType, keyword.indexForUpgrades, keyword.designerDescription, keyword.isPermanent, keyword.duration, keyword.getKeywordValueList(), keyword.startsActive, keyword.conditions, keyword.imageName).keyword;
                keywordCopy.myEntity = runtimeEnchantment;
                runtimeEnchantment.runtimeKeywords.push(keywordCopy);
            }
            // add abilities
            for (var _b = 0, _c = libraryEnchantment.activatedAbilities; _b < _c.length; _b++) {
                var activatedAbility = _c[_b];
                var abilityCopy = ActivatedAbility_1.default.createActivatedAbility(activatedAbility.indexForUpgrades, activatedAbility.name, Effect_1.default.createEffect(activatedAbility.effect.effectEnum, activatedAbility.effect.effectValueList, activatedAbility.effect.targetTypes).effect, activatedAbility.costs, activatedAbility.usesPerTurn, activatedAbility.usesRemaining, activatedAbility.usableInPhases, activatedAbility.isActive, activatedAbility.imageName);
                runtimeEnchantment.activatedAbilities.push(abilityCopy);
            }
            currentTargetCard.enchantments.push(runtimeEnchantment);
        }
    };
    return EnchantCardEffect;
}(GiveEnchantmentBaseEffect_1.default));
exports.default = EnchantCardEffect;
