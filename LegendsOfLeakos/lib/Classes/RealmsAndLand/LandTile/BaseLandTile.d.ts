import { LandType } from '../../../Enums/LandAndBiome';
declare class BaseLandTile {
    id: number;
    x: number;
    y: number;
    z: number;
    landType: LandType;
    depth: number;
    neighbors: BaseLandTile[];
    setDepth(newDepth: number): void;
    changeType(setType: number): void;
    findNeighbors(landTiles: BaseLandTile[]): void;
    getNeighborNumber(neighbor: number): BaseLandTile | null;
    static assignNeighbors(landTiles: BaseLandTile[]): void;
    static assignDepth(landTiles: BaseLandTile[]): void;
    static assignCoords(landTiles: BaseLandTile[], realmLayout: number[]): void;
}
export default BaseLandTile;
