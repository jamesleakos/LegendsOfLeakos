import DeckRequirement from './DeckRequirement';
import { DeckReqVariableNames } from '../../Enums/DeckRequirements';
import LibraryBiome from '../RealmsAndLand/Biome/LibraryBiome';
import LibraryCard from '../Card/LibraryCard';
import LibraryLandTile from '../RealmsAndLand/LandTile/LibraryLandTile';
import { BiomeType } from '../../Enums/LandAndBiome';

class LandAmountDeckRequirement extends DeckRequirement {
  constructor(biomeType: number, amount: number) {
    super();
    this.title = 'Land Req';
    this.reqValues.set(DeckReqVariableNames.BiomeType, biomeType);
    this.reqValues.set(DeckReqVariableNames.Amount, amount);
  }

  override myRequiredValues(): DeckReqVariableNames[] {
    return [DeckReqVariableNames.Amount, DeckReqVariableNames.BiomeType];
  }

  override canBeAdded(myBiome: LibraryBiome, myCard: LibraryCard): boolean {
    return this.isRequirementMet(myBiome, myCard.libraryId);
  }

  isRequirementMet(biome: LibraryBiome, myCardLibraryId: number): boolean {
    let landTiles: LibraryLandTile[] = biome.landTiles.filter(
      (c: LibraryLandTile) =>
        c.landType === this.reqValues.get(DeckReqVariableNames.BiomeType)
    );
    if (landTiles !== undefined) {
      return (
        landTiles.length >= this.reqValues.get(DeckReqVariableNames.Amount)
      );
    }

    return false;
  }

  requirementToText(): string {
    return (
      this.reqValues.get(DeckReqVariableNames.Amount).toString() +
      ' of ' +
      (
        this.reqValues.get(DeckReqVariableNames.BiomeType) as BiomeType
      ).toString()
    );
  }
}

export default LandAmountDeckRequirement;
