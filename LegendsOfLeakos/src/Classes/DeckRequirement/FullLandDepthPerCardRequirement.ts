import DeckRequirement from './DeckRequirement';
import { DeckReqVariableNames } from '../../Enums/DeckRequirements';
import LibraryBiome from '../RealmsAndLand/Biome/LibraryBiome';
import LibraryCard from '../Card/LibraryCard';
import GameManager from '../Game/GameManager';
import { BiomeDepth, BiomeType } from '../../Enums/LandAndBiome';

class FullLandDepthPerCardRequirement extends DeckRequirement {
  constructor(
    biomeType: number,
    biomeDepth: number,
    perCardAmount: number,
    amount: number
  ) {
    super();
    this.title = 'Land per Card Req';
    this.reqValues.set(DeckReqVariableNames.BiomeType, biomeType);
    this.reqValues.set(DeckReqVariableNames.BiomeDepth, biomeDepth);
    this.reqValues.set(DeckReqVariableNames.PerCardAmount, perCardAmount);
    this.reqValues.set(DeckReqVariableNames.Amount, amount);
  }

  override myRequiredValues(): DeckReqVariableNames[] {
    return [
      DeckReqVariableNames.BiomeType,
      DeckReqVariableNames.BiomeDepth,
      DeckReqVariableNames.PerCardAmount,
      DeckReqVariableNames.Amount,
    ];
  }

  override canBeAdded(myBiome: LibraryBiome, myCard: LibraryCard): boolean {
    return this.wouldRequirementBeMetAtSomeNumberOfMyCard(
      myBiome,
      myBiome.getCardsCountByLibraryID(myCard.libraryId) + 1
    );
  }

  override isRequirementMet(
    myBiome: LibraryBiome,
    libraryCardID: number
  ): boolean {
    return this.wouldRequirementBeMetAtSomeNumberOfMyCard(
      myBiome,
      myBiome.getCardsCountByLibraryID(libraryCardID)
    );
  }

  private wouldRequirementBeMetAtSomeNumberOfMyCard(
    myBiome: LibraryBiome,
    numberOfMyCard: number
  ): boolean {
    if (
      myBiome.biomeType !== this.reqValues.get(DeckReqVariableNames.BiomeType)
    )
      return false;

    let testingEntry: LibraryBiome;
    if (
      (
        this.reqValues.get(DeckReqVariableNames.BiomeDepth) as BiomeDepth
      ).toString() === 'all'
    ) {
      testingEntry = myBiome;
    } else {
      let subEntry = myBiome.subBiomes.find(
        (sb) =>
          sb.biomeDepth === this.reqValues.get(DeckReqVariableNames.BiomeDepth)
      );
      if (subEntry === undefined) return false;

      testingEntry = subEntry;
    }

    if (
      (testingEntry.landTiles.length /
        this.reqValues.get(DeckReqVariableNames.Amount)) *
        this.reqValues.get(DeckReqVariableNames.PerCardAmount) <
      numberOfMyCard
    )
      return false;

    return true;
  }

  override requirementToText(gameManager: GameManager): string {
    return (
      this.reqValues.get(DeckReqVariableNames.Amount) +
      ' of ' +
      (
        this.reqValues.get(DeckReqVariableNames.BiomeDepth) as BiomeDepth
      ).toString() +
      ' ' +
      (
        this.reqValues.get(DeckReqVariableNames.BiomeType) as BiomeType
      ).toString() +
      ' per ' +
      this.reqValues.get(DeckReqVariableNames.PerCardAmount)
    );
  }
}

export default FullLandDepthPerCardRequirement;
