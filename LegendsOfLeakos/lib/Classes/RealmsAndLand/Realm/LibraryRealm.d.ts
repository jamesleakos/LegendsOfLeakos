import LibraryBiome from '../Biome/LibraryBiome';
import LibraryLandTile from '../LandTile/LibraryLandTile';
import LibraryCard from '../../Cards/LibraryCard';
import { BiomeType, LandType } from '../../../Enums/LandAndBiome';
declare class LibraryRealm {
    name: string;
    biomes: LibraryBiome[];
    getNumCards(): number;
    deleteAllCards(): void;
    getLandTiles(): LibraryLandTile[];
    changeLandTileType(tile_id: number, newLandType: LandType, cardLibrary?: LibraryCard[], realmLayout?: any): void;
    isRealmValid(realmLayout?: any): boolean;
    static copyRealm(oldRealm: LibraryRealm): LibraryRealm;
    initalizeLandTiles(realmLayout?: any): void;
    updateRealm(cardLibrary?: LibraryCard[]): void;
    static biomeAdder(landTile: LibraryLandTile, landTiles: LibraryLandTile[], biomeType: BiomeType, tempBiomes: LibraryBiome[]): void;
    static recursiveTileAdder(landTile: LibraryLandTile, tempBiome: LibraryBiome): void;
    static fromJSON(json: any): LibraryRealm;
    toJSON(): any;
}
export default LibraryRealm;
