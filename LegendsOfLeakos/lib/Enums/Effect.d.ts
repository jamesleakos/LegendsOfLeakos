declare enum EffectType {
    NormalAttack = 0,
    BlockedAttack = 1,
    DealSetDamage = 2,
    DealDamageEqualToAttack = 3,
    GiveShieldedKeyword = 4,
    GiveShieldedKeywordBasedOnOtherUnits = 5,
    EnchantCard = 6,
    EnchantZone = 7
}
declare enum EffectValueType {
    MoveEffectZoneMovingTo = 0,
    DamageToAttackingCard = 1,
    DamageToAttackedCard = 2,
    DamageToBlockingCards = 3,
    AttackedCardDamagePrevented = 4,
    AttackingCardDamagePrevented = 5,
    DamageToBlockingCardsPrevented = 6,
    BlockingCardInstanceIds = 7,
    DamageAmount = 8,
    ShieldedKeywordShieldAmount = 9,
    ShieldKeywordShieldingCardInstanceId = 10,
    KeywordIsPermanent = 11,
    KeywordDuration = 12,
    HitDivineShield = 13,
    CreateEnchantmentEnchantmentLibraryID = 14
}
export { EffectType, EffectValueType };
