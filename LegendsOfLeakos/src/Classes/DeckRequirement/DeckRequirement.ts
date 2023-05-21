import LibraryCard from '../Card/LibraryCard';
import LibraryBiome from '../RealmsAndLand/Biome/LibraryBiome';
import { DeckReqVariableNames } from '../../Enums/DeckRequirements';

abstract class DeckRequirement {
  title: string;
  reqValues: Map<DeckReqVariableNames, number>;

  abstract canBeAdded(myBiome: LibraryBiome, myCard: LibraryCard): boolean;

  abstract isRequirementMet(
    myBiome: LibraryBiome,
    myCard: LibraryCard
  ): boolean;

  abstract requirementToText(): string;

  abstract myRequiredValues(): DeckReqVariableNames[];
}

export default DeckRequirement;
