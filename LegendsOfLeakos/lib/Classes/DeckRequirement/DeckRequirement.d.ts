import LibraryCard from '../Card/LibraryCard';
import LibraryBiome from '../RealmsAndLand/Biome/LibraryBiome';
import { DeckReqVariableNames } from '../../Enums/DeckRequirements';
declare abstract class DeckRequirement {
    title: string;
    reqValues: Map<DeckReqVariableNames, number>;
    abstract canBeAdded(myBiome: LibraryBiome, myCard: LibraryCard): boolean;
    abstract isRequirementMet(myBiome: LibraryBiome, libraryCardID: number): boolean;
    abstract requirementToText(gameProperties: any): string;
    abstract myRequiredValues(): DeckReqVariableNames[];
    static fromJSON(json: any): DeckRequirement;
}
export default DeckRequirement;
