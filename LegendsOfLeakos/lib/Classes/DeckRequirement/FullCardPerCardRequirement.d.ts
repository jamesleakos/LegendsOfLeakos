import DeckRequirement from './DeckRequirement';
import { DeckReqVariableNames } from '../../Enums/DeckRequirements';
import LibraryBiome from '../RealmsAndLand/Biome/LibraryBiome';
import LibraryCard from '../Card/LibraryCard';
import GameManager from '../Game/GameManager';
declare class FullCardPerCardRequirement extends DeckRequirement {
    constructor(libraryId: number, perCardAmount: number, amount: number);
    myRequiredValues(): DeckReqVariableNames[];
    canBeAdded(myBiome: LibraryBiome, myCard: LibraryCard): boolean;
    isRequirementMet(myBiome: LibraryBiome, libraryCardID: number): boolean;
    private wouldRequirementBeMetAtSomeNumberOfMyCard;
    requirementToText(gameManager: GameManager): string;
}
export default FullCardPerCardRequirement;
