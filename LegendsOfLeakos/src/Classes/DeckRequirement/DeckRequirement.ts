import LibraryCard from '../Card/LibraryCard';
import LibraryBiome from '../RealmsAndLand/Biome/LibraryBiome';
import { DeckReqType, DeckReqVariable } from '../../Enums/DeckRequirements';
import CardAmountDeckRequirement from './CardAmountDeckRequirement';
import DepthAmountDeckRequirement from './DepthAmountDeckRequirement';
import FullCardPerCardRequirement from './FullCardPerCardRequirement';
import FullLandDepthPerCardRequirement from './FullLandDepthPerCardRequirement';
import LandAmountDeckRequirement from './LandAmountDeckRequirement';

abstract class DeckRequirement {
  type: DeckReqType;
  reqValues: Map<DeckReqVariable, number>;

  abstract canBeAdded(myBiome: LibraryBiome, myCard: LibraryCard): boolean;

  abstract isRequirementMet(
    myBiome: LibraryBiome,
    libraryCardID: number
  ): boolean;

  abstract requirementToText(gameProperties: any): string;

  abstract myRequiredValues(): DeckReqVariable[];

  toJSON(): any {
    let reqValueList: any = [];
    this.reqValues.forEach((value, key) => {
      reqValueList.push({ key: key.toString(), value: value });
    });
    return {
      type: this.type.toString(),
      reqValues: reqValueList,
    };
  }

  static fromJSON(json: any): DeckRequirement {
    let reqType = json.type as DeckReqType;
    switch (reqType) {
      case DeckReqType.CardAmount:
        return CardAmountDeckRequirement.fromJSON(json);
      case DeckReqType.FullCardPerCard:
        return FullCardPerCardRequirement.fromJSON(json);
      case DeckReqType.DepthAmount:
        return DepthAmountDeckRequirement.fromJSON(json);
      case DeckReqType.FullLandDepthPerCard:
        return FullLandDepthPerCardRequirement.fromJSON(json);
      case DeckReqType.LandAmount:
        return LandAmountDeckRequirement.fromJSON(json);
      default:
        throw new Error('Unknown DeckRequirement type: ' + reqType);
    }
  }
}

export default DeckRequirement;
