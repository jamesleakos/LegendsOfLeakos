import DeckRequirement from './DeckRequirement';
import { DeckReqVariableNames } from '../../Enums/DeckRequirements';
import LibraryBiome from '../RealmsAndLand/Biome/LibraryBiome';
import LibraryCard from '../Card/LibraryCard';
declare class LandAmountDeckRequirement extends DeckRequirement {
    constructor(biomeType: number, amount: number);
    myRequiredValues(): DeckReqVariableNames[];
    canBeAdded(myBiome: LibraryBiome, myCard: LibraryCard): boolean;
    isRequirementMet(biome: LibraryBiome, myCardLibraryId: number): boolean;
    requirementToText(): string;
}
export default LandAmountDeckRequirement;
