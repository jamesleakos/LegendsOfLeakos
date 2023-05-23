import DeckRequirement from './DeckRequirement';
import { DeckReqVariableNames } from '../../Enums/DeckRequirements';
import GameManager from '../Game/GameManager';
import LibraryBiome from '../RealmsAndLand/Biome/LibraryBiome';
import LibraryCard from '../Card/LibraryCard';
declare class DepthAmountDeckRequirement extends DeckRequirement {
    constructor(biomeDepth: number, amount: number);
    myRequiredValues(): DeckReqVariableNames[];
    canBeAdded(myBiome: LibraryBiome, myCard: LibraryCard): boolean;
    isRequirementMet(myBiome: LibraryBiome, libraryCardID: number): boolean;
    requirementToText(gameManager: GameManager): string;
}
export default DepthAmountDeckRequirement;
