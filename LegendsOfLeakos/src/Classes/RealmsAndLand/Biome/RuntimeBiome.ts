import RuntimeCard from '../../Card/RuntimeCard';
import RuntimeLandTile from '../LandTile/RuntimeLandTile';
import { BiomeType } from '../../../Enums/LandAndBiome';

class RuntimeBiome {
  biomeType: BiomeType;
  cards: RuntimeCard[];
  landTiles: RuntimeLandTile[];
}

export default RuntimeBiome;
