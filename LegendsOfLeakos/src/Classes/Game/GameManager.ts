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
}

export default GameManager;
