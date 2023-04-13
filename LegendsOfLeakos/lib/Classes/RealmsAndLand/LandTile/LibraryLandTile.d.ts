import RuntimeLandTile from './RuntimeLandTile';
declare class LibraryLandTile {
    id: number;
    x: number;
    y: number;
    z: number;
    depth: number;
    landType: number;
    constructor(id: number, x: number, y: number, z: number, depth: number, landType: number);
    static getRealmEntryFromLandTile(landTile: RuntimeLandTile): LibraryLandTile;
    static copyLandTile(oldEntry: LibraryLandTile): LibraryLandTile;
}
export default LibraryLandTile;
