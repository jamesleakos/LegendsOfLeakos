import LibraryCardEntry from './LibraryCardEntry';
import LibraryLandTile from '../LandTile/LibraryLandTile';
import LibraryCard from '../../Cards/LibraryCard';
import { BiomeAddCardEnum } from '../../../Enums/LandAndBiome';
declare class BiomeAddCardMessage {
    result: BiomeAddCardEnum;
    numberAdded: number;
    message: string;
    constructor(result: BiomeAddCardEnum, numberAdded: number, message: string);
}
declare class BiomeValidMessage {
    isValid: boolean;
    message: string;
    constructor(isValid: boolean, message: string);
}
declare class LibraryBiome {
    biomeType: number;
    biomeDepth: number;
    cards: LibraryCardEntry[];
    landTiles: LibraryLandTile[];
    subBiomes: LibraryBiome[];
    static copyBiome(oldBiome: LibraryBiome): LibraryBiome;
    wouldRemovingThisCardCauseErrors(card: LibraryCard): BiomeValidMessage;
    areBiomeAndSubsValid(message?: BiomeValidMessage, cardLibrary?: LibraryCard[]): BiomeValidMessage;
    private cardsCanBeAddedToBiomeOrSubbiome;
    private cardsCanBeAddedToThisBiome;
    getCardsCount(): number;
    getCardsCountByLibraryID(libraryId: number): number;
    getCardsCountByCardType(config: any, cardTypeId: number): number;
    addCardsToBiomeOrSubbiome(card: LibraryCard, amount: number): BiomeAddCardMessage;
    private addCard;
    deleteAllCards(): void;
    removeSingleCardFromBiomeOrSubbiome(card: LibraryCard): void;
    removeCards(card: any): void;
    removeSingleCard(card: any): void;
    toJSON(): any;
    static fromJSON(json: any): LibraryBiome;
}
export default LibraryBiome;
