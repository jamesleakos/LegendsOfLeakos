import DeckRequirement from './DeckRequirement';
import { DeckReqVariableNames } from '../../Enums/DeckRequirements';
import GameManager from '../Game/GameManager';
import LibraryBiome from '../RealmsAndLand/Biome/LibraryBiome';
import LibraryCard from '../Card/LibraryCard';
import LibraryLandTile from '../RealmsAndLand/LandTile/LibraryLandTile';
import { BiomeDepth } from '../../Enums/LandAndBiome';

class DepthAmountDeckRequirement extends DeckRequirement {
  constructor(biomeDepth: number, amount: number) {
    super();
    this.title = 'Depth Req';
    this.reqValues.set(DeckReqVariableNames.BiomeDepth, biomeDepth);
    this.reqValues.set(DeckReqVariableNames.Amount, amount);
  }

  override myRequiredValues(): DeckReqVariableNames[] {
    return [DeckReqVariableNames.BiomeDepth, DeckReqVariableNames.Amount];
  }

  override canBeAdded(myBiome: LibraryBiome, myCard: LibraryCard): boolean {
    return this.isRequirementMet(myBiome, myCard.libraryId);
  }

  override isRequirementMet(
    myBiome: LibraryBiome,
    libraryCardID: number
  ): boolean {
    let counter = 0;
    let landTiles: LibraryLandTile[] = myBiome.landTiles.filter(
      (lt: LibraryLandTile) =>
        lt.depth === this.reqValues.get(DeckReqVariableNames.BiomeDepth)
    );
    if (landTiles !== undefined) {
      counter += landTiles.length;
    }

    return counter >= this.reqValues.get(DeckReqVariableNames.Amount);
  }

  override requirementToText(gameManager: GameManager): string {
    return (
      this.reqValues.get(DeckReqVariableNames.Amount) +
      ' of ' +
      (
        this.reqValues.get(DeckReqVariableNames.BiomeDepth) as BiomeDepth
      ).toString()
    );
  }
}

export default DepthAmountDeckRequirement;
