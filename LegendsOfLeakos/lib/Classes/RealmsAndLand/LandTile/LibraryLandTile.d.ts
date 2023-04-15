import { LandType } from '../../../Enums/LandAndBiome';
import BaseLandTile from './BaseLandTile';
declare class LibraryLandTile extends BaseLandTile {
    static libraryLandTileFactory(id: number, x: number, y: number, z: number, depth: number, landType: number): LibraryLandTile;
    static copyLandTile(oldEntry: LibraryLandTile): LibraryLandTile;
    toJSON(): {
        id: number;
        x: number;
        y: number;
        z: number;
        depth: number;
        landType: LandType;
    };
    static fromJSON: (json: any) => LibraryLandTile;
    mostCommonNeighborType(): number;
}
export default LibraryLandTile;
