"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EffectValueType = exports.EffectType = void 0;
var EffectType;
(function (EffectType) {
    // Attack Effects
    EffectType[EffectType["NormalAttack"] = 0] = "NormalAttack";
    EffectType[EffectType["BlockedAttack"] = 1] = "BlockedAttack";
    // Aggressive Effects
    EffectType[EffectType["DealSetDamage"] = 2] = "DealSetDamage";
    EffectType[EffectType["DealDamageEqualToAttack"] = 3] = "DealDamageEqualToAttack";
    // Give Keywords
    EffectType[EffectType["GiveShieldedKeyword"] = 4] = "GiveShieldedKeyword";
    EffectType[EffectType["GiveShieldedKeywordBasedOnOtherUnits"] = 5] = "GiveShieldedKeywordBasedOnOtherUnits";
    // Give Enchantments
    EffectType[EffectType["EnchantCard"] = 6] = "EnchantCard";
    EffectType[EffectType["EnchantZone"] = 7] = "EnchantZone";
})(EffectType || (EffectType = {}));
exports.EffectType = EffectType;
var EffectValueType;
(function (EffectValueType) {
    // Moving Zone Effects
    EffectValueType[EffectValueType["MoveEffectZoneMovingTo"] = 0] = "MoveEffectZoneMovingTo";
    // Attack / Blocking Effects
    EffectValueType[EffectValueType["DamageToAttackingCard"] = 1] = "DamageToAttackingCard";
    EffectValueType[EffectValueType["DamageToAttackedCard"] = 2] = "DamageToAttackedCard";
    EffectValueType[EffectValueType["DamageToBlockingCards"] = 3] = "DamageToBlockingCards";
    EffectValueType[EffectValueType["AttackedCardDamagePrevented"] = 4] = "AttackedCardDamagePrevented";
    EffectValueType[EffectValueType["AttackingCardDamagePrevented"] = 5] = "AttackingCardDamagePrevented";
    EffectValueType[EffectValueType["DamageToBlockingCardsPrevented"] = 6] = "DamageToBlockingCardsPrevented";
    EffectValueType[EffectValueType["BlockingCardInstanceIds"] = 7] = "BlockingCardInstanceIds";
    // Card Effects
    EffectValueType[EffectValueType["DamageAmount"] = 8] = "DamageAmount";
    // Create Keywords
    EffectValueType[EffectValueType["ShieldedKeywordShieldAmount"] = 9] = "ShieldedKeywordShieldAmount";
    EffectValueType[EffectValueType["ShieldKeywordShieldingCardInstanceId"] = 10] = "ShieldKeywordShieldingCardInstanceId";
    EffectValueType[EffectValueType["KeywordIsPermanent"] = 11] = "KeywordIsPermanent";
    EffectValueType[EffectValueType["KeywordDuration"] = 12] = "KeywordDuration";
    // Keyword Modifications
    EffectValueType[EffectValueType["HitDivineShield"] = 13] = "HitDivineShield";
    // Enchantments
    EffectValueType[EffectValueType["CreateEnchantmentEnchantmentLibraryID"] = 14] = "CreateEnchantmentEnchantmentLibraryID";
})(EffectValueType || (EffectValueType = {}));
exports.EffectValueType = EffectValueType;
