import DeckRequirement from './DeckRequirement';
import { DeckReqVariableNames } from '../../Enums/DeckRequirements';

class CardDeckRequirement extends DeckRequirement {
  constructor(libraryId: number, amount: number) {
    super();
    this.title = 'Card Req';
    this.reqValues.set(DeckReqVariableNames.Amount, amount);
    this.reqValues.set(DeckReqVariableNames.LibraryCardId, libraryId);
  }

  override myRequiredValues(): DeckReqVariableNames[] {
    return [DeckReqVariableNames.Amount, DeckReqVariableNames.LibraryCardId];

    return new DeckRequirementReturnTypes(mainList, stringList, intAndEnumList);
  }

  override canBeAdded(biome: Biome, myCard: Card): boolean {
    return this.IsRequirementMet(biome, myCard.libraryId);
  }

  override isRequirementMet(biome: Biome, myCardLibraryId: number): boolean {
    let counter = 0;
    let deckEntry = biome.deck.cards.find(
      (c) => c.libraryId === this.reqValues.get(DeckReqVariableNames.libraryId)
    );
    if (deckEntry !== undefined) {
      counter += deckEntry.amount;
    }
    for (let subbiome of biome.subBiomes) {
      let subDeckEntry = subbiome.deck.cards.find(
        (c) =>
          c.libraryId === this.reqValues.get(DeckReqVariableNames.libraryId)
      );
      if (subDeckEntry !== undefined) {
        counter += subDeckEntry.amount;
      }
    }

    return counter >= this.reqValues.get(DeckReqVariableNames.amount);
  }

  override requirementToText(): string {
    return (
      this.reqValues.get(DeckReqVariableNames.amount).toString() +
      ' of ' +
      GameManager.Instance.config.cards.find(
        (c) =>
          c.libraryId === this.reqValues.get(DeckReqVariableNames.libraryId)
      ).name.value
    );
  }
}
