import LibraryBiome from '../Biome/LibraryBiome';
import LibraryLandTile from '../LandTile/LibraryLandTile';
import { BiomeType, LandType } from '../../../Enums/LandAndBiome';
import GameManager from '../../Game/GameManager';
declare class LibraryRealm {
    name: string;
    biomes: LibraryBiome[];
    getNumCards(): number;
    deleteAllCards(): void;
    getLandTiles(): LibraryLandTile[];
    changeLandTileType(tile_id: number, newLandType: LandType, gameManager: GameManager): void;
    isRealmValid(gameManager: GameManager): boolean;
    static copyRealm(oldRealm: LibraryRealm): LibraryRealm;
    initalizeLandTiles(realmLayout?: any): void;
    updateRealm(gameManager: GameManager): void;
    static biomeAdder(landTile: LibraryLandTile, landTiles: LibraryLandTile[], biomeType: BiomeType, tempBiomes: LibraryBiome[]): void;
    static recursiveTileAdder(landTile: LibraryLandTile, tempBiome: LibraryBiome): void;
    static fromJSON(json: any): LibraryRealm;
    toJSON(): any;
}
export default LibraryRealm;
