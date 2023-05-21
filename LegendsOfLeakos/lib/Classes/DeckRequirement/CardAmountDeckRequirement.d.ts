import DeckRequirement from './DeckRequirement';
import { DeckReqVariableNames } from '../../Enums/DeckRequirements';
import LibraryCard from '../Card/LibraryCard';
import LibraryBiome from '../RealmsAndLand/Biome/LibraryBiome';
import GameManager from '../Game/GameManager';
declare class CardDeckRequirement extends DeckRequirement {
    constructor(libraryId: number, amount: number);
    myRequiredValues(): DeckReqVariableNames[];
    canBeAdded(myBiome: LibraryBiome, myCard: LibraryCard): boolean;
    isRequirementMet(myBiome: LibraryBiome, libraryCardID: number): boolean;
    requirementToText(gameManager: GameManager): string;
}
export default CardDeckRequirement;
