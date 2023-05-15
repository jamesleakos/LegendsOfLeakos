import LibraryCard from '../Card/LibraryCard';
import LibraryEnchantment from '../Enchantment/LibraryEnchantment';
//
// In-game entry point to all data outside of game state.
// Includes hard-coded data from constants.properties, as well as library data from the database

class GameManager {
  // properties
  gameProperties: any = {};

  // library objects
  cardLibrary: LibraryCard[] = [];
  enchantmentLibrary: LibraryEnchantment[] = [];

  // methods
  public getCardFromLibraryId(libraryId: number): LibraryCard {
    const card: LibraryCard | undefined = this.cardLibrary.find(
      (x) => x.libraryId === libraryId
    );
    if (card === undefined) {
      throw new Error(`Could not find card with libraryId ${libraryId}`);
    }
    return card;
  }

  public getEnchantmentFromLibraryId(libraryId: number): LibraryEnchantment {
    const enchantment: LibraryEnchantment | undefined =
      this.enchantmentLibrary.find((x) => x.libraryId === libraryId);
    if (enchantment === undefined) {
      throw new Error(`Could not find enchantment with libraryId ${libraryId}`);
    }
    return enchantment;
  }
}

export default GameManager;
