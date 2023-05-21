import DeckRequirement from './DeckRequirement';
import { DeckReqVariableNames } from '../../Enums/DeckRequirements';
import LibraryCard from '../Card/LibraryCard';
import LibraryBiome from '../RealmsAndLand/Biome/LibraryBiome';
import LibraryCardEntry from '../RealmsAndLand/Biome/LibraryCardEntry';
import GameManager from '../Game/GameManager';

class CardDeckRequirement extends DeckRequirement {
  constructor(libraryId: number, amount: number) {
    super();
    this.title = 'Card Req';
    this.reqValues.set(DeckReqVariableNames.Amount, amount);
    this.reqValues.set(DeckReqVariableNames.LibraryCardId, libraryId);
  }

  override myRequiredValues(): DeckReqVariableNames[] {
    return [DeckReqVariableNames.Amount, DeckReqVariableNames.LibraryCardId];
  }

  override canBeAdded(myBiome: LibraryBiome, myCard: LibraryCard): boolean {
    return this.isRequirementMet(myBiome, myCard.libraryId);
  }

  override isRequirementMet(
    myBiome: LibraryBiome,
    libraryCardID: number
  ): boolean {
    let counter = 0;
    let libraryCardEntry: LibraryCardEntry = myBiome.cards.find(
      (c) =>
        c.libraryId === this.reqValues.get(DeckReqVariableNames.LibraryCardId)
    );
    if (libraryCardEntry !== undefined) {
      counter += libraryCardEntry.amount;
    }
    for (let subbiome of myBiome.subBiomes) {
      let subCardEntry = subbiome.cards.find(
        (c) =>
          c.libraryId === this.reqValues.get(DeckReqVariableNames.LibraryCardId)
      );
      if (subCardEntry !== undefined) {
        counter += subCardEntry.amount;
      }
    }

    return counter >= this.reqValues.get(DeckReqVariableNames.Amount);
  }

  override requirementToText(gameManager: GameManager): string {
    return (
      this.reqValues.get(DeckReqVariableNames.Amount) +
      ' of ' +
      gameManager.cardLibrary.find(
        (c) =>
          c.libraryId === this.reqValues.get(DeckReqVariableNames.LibraryCardId)
      ).name
    );
  }
}

export default CardDeckRequirement;
