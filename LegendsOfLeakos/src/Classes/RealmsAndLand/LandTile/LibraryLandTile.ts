import RuntimeLandTile from './RuntimeLandTile';

class LibraryLandTile {
  public id: number;
  public x: number;
  public y: number;
  public z: number;
  public depth: number;
  public landType: number;

  constructor(
    id: number,
    x: number,
    y: number,
    z: number,
    depth: number,
    landType: number
  ) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.z = z;
    this.depth = depth;
    this.landType = landType;
  }

  static getRealmEntryFromLandTile(landTile: RuntimeLandTile): LibraryLandTile {
    const tempTile = new LibraryLandTile(
      landTile.id,
      landTile.x,
      landTile.y,
      landTile.z,
      landTile.depth,
      landTile.landType
    );

    return tempTile;
  }

  static copyLandTile(oldEntry: LibraryLandTile): LibraryLandTile {
    return new LibraryLandTile(
      oldEntry.id,
      oldEntry.x,
      oldEntry.y,
      oldEntry.z,
      oldEntry.depth,
      oldEntry.landType
    );
  }
}

export default LibraryLandTile;
