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
var EnchantZoneEffect = /** @class */ (function (_super) {
    __extends(EnchantZoneEffect, _super);
    function EnchantZoneEffect(setEffectValues, setTargetTypes) {
        var _this = _super.call(this) || this;
        _this.effectEnum = Effect_2.EffectType.EnchantZone;
        _this.setEffectValueList(setEffectValues);
        _this.setTargetTypeList(setTargetTypes);
        return _this;
    }
    // Enchantment Creation Static Vars
    // variables and methods to help with the creation of these effects by a person in the card creator
    EnchantZoneEffect.prototype.myRequiredEffectValues = function () {
        var tempList = [
        // not sure if I need anything here
        ];
        for (var _i = 0, _a = _super.prototype.myRequiredEffectValues.call(this); _i < _a.length; _i++) {
            var x = _a[_i];
            tempList.push(x);
        }
        return tempList;
    };
    EnchantZoneEffect.prototype.numberOfTargetTypes = function () {
        return 1;
    };
    EnchantZoneEffect.prototype.targetTypeInfoList = function () {
        var list = [];
        list.push(new TargetTypeInfo_1.default('Targets To Be Enchanted', // name
        'These are the zones that are enchanted by this effect.', // description
        'Targets must be zones', 1, // minMinSelectionsRequired
        null // maxMaxSelectionsRequired
        ));
        return list;
    };
    // Effect To Text
    EnchantZoneEffect.prototype.effectToString = function (gameManager) {
        var outText = 'Enchant zone with ' +
            gameManager.enchantmentLibrary[this.getEffectValue(Effect_2.EffectValueType.CreateEnchantmentEnchantmentLibraryID).setValue];
        return outText;
    };
    EnchantZoneEffect.prototype.preEffect = function (state, sourceEntity, targetInfoList) {
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
    EnchantZoneEffect.prototype.resolve = function (state, sourceEntity, targetInfoList) {
        var zonesToEnchant = targetInfoList[0];
        var zonesToEnchantTargetType = this.targetTypes[0];
        if (!this.isTargetInfoStillValid(sourceEntity, state, zonesToEnchant, this.targetTypes[0]))
            return;
        var enchantmentLibID = this.getEffectValue(Effect_2.EffectValueType.CreateEnchantmentEnchantmentLibraryID);
        for (var i = 0; i < zonesToEnchant.zoneInstanceIdList.length; i++) {
            var currentTargetZone = state.getZone(zonesToEnchant.zoneInstanceIdList[i]);
            if (!zonesToEnchantTargetType.zoneSatisfiesConditions(currentTargetZone))
                break;
            var creatingPlayer = sourceEntity.ownerPlayer;
            var libraryEnchantment = state.gameManager.getEnchantmentFromLibraryId(enchantmentLibID.modInts[i].effectiveValue);
            var runtimeEnchantment = new RuntimeEnchantment_1.default(libraryEnchantment.libraryId, // this could also just be setValue probably
            state.gameManager.enchantmentLibrary, creatingPlayer.currentEntityInstanceId++, sourceEntity, sourceEntity.ownerPlayer, new Array(), new Array(), currentTargetZone, null);
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
            currentTargetZone.enchantments.push(runtimeEnchantment);
        }
    };
    return EnchantZoneEffect;
}(GiveEnchantmentBaseEffect_1.default));
exports.default = EnchantZoneEffect;
