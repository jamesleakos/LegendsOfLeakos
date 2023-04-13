import LibraryBiome from '../Biome/LibraryBiome';
import LibraryLandTile from '../LandTile/LibraryLandTile';
import RuntimeLandTile from '../LandTile/RuntimeLandTile';
import LibraryCard from '../../Cards/LibraryCard';
import { BiomeType } from '../../../Enums/LandAndBiome';
declare class LibraryRealm {
    name: string;
    biomes: LibraryBiome[];
    getNumCards(): number;
    deleteAllCards(): void;
    getLandTiles(): LibraryLandTile[];
    isRealmValid(): boolean;
    static copyRealm(oldRealm: LibraryRealm): LibraryRealm;
    static updateRealm(realm: LibraryRealm, landTiles: RuntimeLandTile[], cardLibrary: LibraryCard[]): void;
    static biomeAdder(landTile: RuntimeLandTile, landTiles: RuntimeLandTile[], biomeType: BiomeType, tempBiomes: LibraryBiome[]): void;
    static recursiveTileAdder(landTile: RuntimeLandTile, tempBiome: LibraryBiome): void;
}
export default LibraryRealm;
