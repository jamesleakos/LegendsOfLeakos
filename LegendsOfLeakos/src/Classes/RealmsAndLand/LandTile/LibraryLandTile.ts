import { LandType } from '../../../Enums/LandAndBiome';
import BaseLandTile from './BaseLandTile';

class LibraryLandTile extends BaseLandTile {
  // this is all in BASELANDTILE
  // public id: number;
  // public x: number;
  // public y: number;
  // public z: number;
  // public depth: number;
  // public landType: number;

  //#region FACTORY AND COPY

  static libraryLandTileFactory(
    id: number,
    x: number,
    y: number,
    z: number,
    depth: number,
    landType: number
  ): LibraryLandTile {
    const tempTile = new LibraryLandTile();
    tempTile.id = id;
    tempTile.x = x;
    tempTile.y = y;
    tempTile.z = z;
    tempTile.depth = depth;
    tempTile.landType = landType;
    return tempTile;
  }

  static copyLandTile(oldEntry: LibraryLandTile): LibraryLandTile {
    return LibraryLandTile.libraryLandTileFactory(
      oldEntry.id,
      oldEntry.x,
      oldEntry.y,
      oldEntry.z,
      oldEntry.depth,
      oldEntry.landType
    );
  }

  //#endregion

  //#region JSON

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
    return LibraryLandTile.libraryLandTileFactory(
      json.id,
      json.x,
      json.y,
      json.z,
      json.depth,
      json.landType
    );
  };

  //#endregion

  //#region OTHER UTILITIES
  mostCommonNeighborType() {
    const typeCounts: { [key: string]: any } = {};
    for (let neighbor of this.neighbors) {
      if (neighbor.landType in typeCounts) {
        typeCounts[neighbor.landType.toString()] += 1;
      } else {
        typeCounts[neighbor.landType.toString()] = 1;
      }
    }
    let mostCommonType = 0;
    let mostCommonCount = 0;

    for (let type in typeCounts) {
      if (typeCounts[type] > mostCommonCount) {
        mostCommonType = parseInt(type);
        mostCommonCount = typeCounts[type];
      }
    }
    return mostCommonType;
  }
}

export default LibraryLandTile;
