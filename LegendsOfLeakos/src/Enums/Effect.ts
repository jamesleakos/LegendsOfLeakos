enum EffectType {
  // Attack Effects
  NormalAttack,
  BlockedAttack,

  // Aggressive Effects
  DealSetDamage,
  DealDamageEqualToAttack,

  // Give Keywords
  GiveShieldedKeyword,
  GiveShieldedKeywordBasedOnOtherUnits,

  // Give Enchantments
  EnchantCard,
  EnchantZone,
}

enum EffectValueType {
  // Moving Zone Effects
  MoveEffectZoneMovingTo,

  // Attack / Blocking Effects
  DamageToAttackingCard,
  DamageToAttackedCard,
  DamageToBlockingCards,
  AttackedCardDamagePrevented,
  AttackingCardDamagePrevented,
  DamageToBlockingCardsPrevented,
  BlockingCardInstanceIds,

  // Card Effects
  DamageAmount,

  // Create Keywords
  ShieldedKeywordShieldAmount,
  ShieldKeywordShieldingCardInstanceId,
  KeywordIsPermanent,
  KeywordDuration,

  // Keyword Modifications
  HitDivineShield,

  // Enchantments
  CreateEnchantmentEnchantmentLibraryID,
}

export { EffectType, EffectValueType };
