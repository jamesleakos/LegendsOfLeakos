import DeckRequirement from './DeckRequirement';
import { DeckReqVariableNames } from '../../Enums/DeckRequirements';
import LibraryBiome from '../RealmsAndLand/Biome/LibraryBiome';
import LibraryCard from '../Card/LibraryCard';
import GameManager from '../Game/GameManager';

class FullCardPerCardRequirement extends DeckRequirement {
  constructor(libraryId: number, perCardAmount: number, amount: number) {
    super();
    this.title = 'Card per Card Req';
    this.reqValues.set(DeckReqVariableNames.LibraryCardId, libraryId);
    this.reqValues.set(DeckReqVariableNames.PerCardAmount, perCardAmount);
    this.reqValues.set(DeckReqVariableNames.Amount, amount);
  }

  override myRequiredValues(): DeckReqVariableNames[] {
    return [
      DeckReqVariableNames.LibraryCardId,
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
    let deckEntry = myBiome.cards.find(
      (c) =>
        c.libraryId === this.reqValues.get(DeckReqVariableNames.LibraryCardId)
    );
    if (deckEntry === undefined) return false;

    if (
      (deckEntry.amount / this.reqValues.get(DeckReqVariableNames.Amount)) *
        this.reqValues.get(DeckReqVariableNames.PerCardAmount) <
      numberOfMyCard
    )
      return false;

    return true;
  }

  override requirementToText(gameManager: GameManager): string {
    let cardInLibrary = gameManager.cardLibrary.find(
      (c) =>
        c.libraryId === this.reqValues.get(DeckReqVariableNames.LibraryCardId)
    );
    return (
      this.reqValues.get(DeckReqVariableNames.Amount) +
      ' of ' +
      cardInLibrary.name +
      ' per ' +
      this.reqValues.get(DeckReqVariableNames.PerCardAmount)
    );
  }
}

export default FullCardPerCardRequirement;
