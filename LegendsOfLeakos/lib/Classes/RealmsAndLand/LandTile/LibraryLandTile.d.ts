import RuntimeLandTile from './RuntimeLandTile';
declare class LibraryLandTile {
    id: number;
    x: number;
    y: number;
    z: number;
    depth: number;
    landType: number;
    constructor(id: number, x: number, y: number, z: number, depth: number, landType: number);
    toJSON(): {
        id: number;
        x: number;
        y: number;
        z: number;
        depth: number;
        landType: number;
    };
    static fromJSON: (json: any) => LibraryLandTile;
    static getRealmEntryFromLandTile(landTile: RuntimeLandTile): LibraryLandTile;
    static copyLandTile(oldEntry: LibraryLandTile): LibraryLandTile;
}
export default LibraryLandTile;
