import AbilityKeywordRuntimeEntity from '../Entities/AbilityKeywordRuntimeEntity';

class RuntimeCard extends AbilityKeywordRuntimeEntity {
  libraryId: number;
  upgradesApplied: number[] = [];
  stats: Map<number, Stat> = new Map<number, Stat>();
  namedStats: Map<string, Stat> = new Map<string, Stat>();
  battlecryAbilities: BattlecryAbility[] = [];
  enchantments: RuntimeEnchantment[] = [];

  amBlocking: boolean;
  serverBlockOrder: number;

  get cardType(): CardType {
    const gameConfig: GameConfiguration = GameManager.Instance.config;
    const libraryCard: Card = gameConfig.getCardFromLibraryId(this.libraryId);
    return gameConfig.cardTypes.find((x) => x.id === libraryCard.cardTypeId);
  }

  get name(): string {
    const gameConfig: GameConfiguration = GameManager.Instance.config;
    const libraryCard: Card = gameConfig.getCardFromLibraryId(this.libraryId);
    return libraryCard.name.value;
  }

  preResolveEffect(
    e: Effect,
    sourceCard: RuntimeCard,
    gameState: GameState,
    targetInfoList: TargetInfo[]
  ): void {
    for (const enchantment of this.enchantments) {
      enchantment.preResolveEffect(e, sourceCard, gameState, targetInfoList);
    }

    super.preResolveEffect(e, sourceCard, gameState, targetInfoList);
  }

  postResolveEffect(
    e: Effect,
    sourceCard: RuntimeCard,
    gameState: GameState,
    targetInfoList: TargetInfo[]
  ): void {
    for (const enchantment of this.enchantments) {
      enchantment.postResolveEffect(e, sourceCard, gameState, targetInfoList);
    }

    super.postResolveEffect(e, sourceCard, gameState, targetInfoList);
  }
}

export default RuntimeCard;
