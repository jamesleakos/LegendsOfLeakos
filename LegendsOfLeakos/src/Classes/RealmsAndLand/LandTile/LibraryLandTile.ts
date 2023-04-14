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

  toJSON() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      z: this.z,
      depth: this.depth,
      landType: this.landType,
    };
  }

  static fromJSON = (json: any): LibraryLandTile => {
    return new LibraryLandTile(
      json.id,
      json.x,
      json.y,
      json.z,
      json.depth,
      json.landType
    );
  };

  static getLibraryLandTileFromRuntimeLandTile(
    landTile: RuntimeLandTile
  ): LibraryLandTile {
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

  getRuntimeLandTile(): RuntimeLandTile {
    const tempTile = new RuntimeLandTile();
    tempTile.id = this.id;
    tempTile.x = this.x;
    tempTile.y = this.y;
    tempTile.z = this.z;
    tempTile.depth = this.depth;
    tempTile.landType = this.landType;
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
