import LibraryCard from '../Card/LibraryCard';
import LibraryEnchantment from '../Enchantment/LibraryEnchantment';
declare class GameManager {
    gameProperties: any;
    cardLibrary: LibraryCard[];
    enchantmentLibrary: LibraryEnchantment[];
    getCardFromLibraryId(libraryId: number): LibraryCard;
    getEnchantmentFromLibraryId(libraryId: number): LibraryEnchantment;
}
export default GameManager;
