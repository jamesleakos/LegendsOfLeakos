import AbilityKeywordRuntimeEntity from '../Entity/AbilityKeywordRuntimeEntity';
import RuntimeCard from '../Card/RuntimeCard';
import PlayerInfo from '../Player/PlayerInfo';
import RuntimeKeyword from '../Keyword/RuntimeKeyword';
import ActivatedAbility from '../Ability/ActivatedAbility';
import RuntimeZone from '../Zone/RuntimeZone';
import LibraryEnchantment from './LibraryEnchantment';

export class RuntimeEnchantment extends AbilityKeywordRuntimeEntity {
  libraryID: number;
  creatingEntity: AbilityKeywordRuntimeEntity;
  residingCard: RuntimeCard | null;
  imageName: string;

  constructor(
    libraryID: number,
    enchantmentLibrary: LibraryEnchantment[],
    instanceId: number,
    creatingEntity: AbilityKeywordRuntimeEntity,
    creatingPlayer: PlayerInfo,
    runtimeKeywords: RuntimeKeyword[],
    abilities: ActivatedAbility[],
    residingZone: RuntimeZone,
    residingCard: RuntimeCard | null = null
  ) {
    super();

    this.libraryID = libraryID;

    this.ownerPlayer = creatingPlayer;
    this.instanceId = instanceId;
    this.residingZone = residingZone;
    this.creatingEntity = creatingEntity;
    this.residingCard = residingCard;

    const libraryEnchantment = enchantmentLibrary.find(
      (c) => c.libraryId === libraryID
    );
    this.name = libraryEnchantment.name;
    this.imageName = libraryEnchantment.imageName;

    runtimeKeywords.forEach((keyword) => {
      const keywordCopy = RuntimeKeyword.createRuntimeKeyword(
        this.instanceId,
        keyword.keywordType,
        keyword.indexForUpgrades,
        keyword.description,
        keyword.isPermanent,
        keyword.duration,
        keyword.keywordValueList,
        keyword.isActive,
        keyword.conditions,
        keyword.imageName.value
      ).getKeyword();
      keywordCopy.myEntity = this;
      this.runtimeKeywords.push(keywordCopy);
    });

    abilities.forEach((activatedAbility) => {
      const abilityCopy = Ability.createActivatedAbility(
        activatedAbility.indexForUpgrades,
        activatedAbility.name,
        EffectFactory.createEffect(
          activatedAbility.effect.effectEnum,
          activatedAbility.effect.effectValueList,
          activatedAbility.effect.targetTypes
        ).getEffect(),
        activatedAbility.costs,
        activatedAbility.usesPerTurn,
        activatedAbility.usesRemaining,
        activatedAbility.usableInPhases,
        activatedAbility.isActive,
        activatedAbility.imageName.name
      );
      this.activatedAbilities.push(abilityCopy);
    });
  }
}
