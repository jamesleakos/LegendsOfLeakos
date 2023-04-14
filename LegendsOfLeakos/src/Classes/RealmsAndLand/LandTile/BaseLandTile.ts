// import LandType enum from Enums
import { LandType } from '../../../Enums/LandAndBiome';

class BaseLandTile {
  // TODO - add player info
  // public playerInfo: PlayerInfo | null = null;

  public id: number;
  public x: number;
  public y: number;
  public z: number;
  public landType: LandType;
  public depth: number;
  public neighbors: BaseLandTile[] = [];

  // I don't think we need these in the base
  // public onDepthChanged: ((newDepth: number) => void)[] = [];
  // public onTypeChanged: ((setType: number) => void)[] = [];
  // public onExploredChanged: ((setExplored: boolean) => void)[] = [];

  // changing depth and type
  setDepth(newDepth: number): void {
    if (newDepth !== this.depth) {
      this.depth = newDepth;
      // this.onDepthChanged.forEach((callback) => callback(newDepth));
    }
  }

  changeType(setType: number): void {
    if (this.landType !== setType) {
      this.landType = setType;
      // this.onTypeChanged.forEach((callback) => callback(setType));
    }
  }

  // neighbors
  findNeighbors(landTiles: BaseLandTile[]): void {
    const directions = [
      { dx: 0, dy: 1, dz: -1 },
      { dx: 0, dy: -1, dz: 1 },
      { dx: 1, dy: 0, dz: -1 },
      { dx: -1, dy: 0, dz: 1 },
      { dx: -1, dy: 1, dz: 0 },
      { dx: 1, dy: -1, dz: 0 },
    ];

    this.neighbors = directions
      .map(({ dx, dy, dz }) =>
        landTiles.find(
          (tile) =>
            tile.x === this.x + dx &&
            tile.y === this.y + dy &&
            tile.z === this.z + dz
        )
      )
      .filter((tile) => tile !== undefined);
  }

  getNeighborNumber(neighbor: number): BaseLandTile | null {
    const directions = [
      { dx: 1, dy: 0, dz: -1 },
      { dx: 1, dy: -1, dz: 0 },
      { dx: 0, dy: -1, dz: 1 },
      { dx: -1, dy: 0, dz: 1 },
      { dx: -1, dy: 1, dz: 0 },
      { dx: 0, dy: 1, dz: -1 },
    ];

    if (neighbor < 1 || neighbor > 6) return null;

    const { dx, dy, dz } = directions[neighbor - 1];
    return (
      this.neighbors.find(
        (tile) =>
          tile.x === this.x + dx &&
          tile.y === this.y + dy &&
          tile.z === this.z + dz
      ) || null
    );
  }

  // static
  static assignNeighbors(landTiles: BaseLandTile[]): void {
    landTiles.forEach((landTile) => {
      landTile.findNeighbors(landTiles);
    });
  }

  static assignDepth(landTiles: BaseLandTile[]): void {
    landTiles.forEach((landTile) => {
      landTile.depth = 2;
      for (const neighbor of landTile.neighbors) {
        if (neighbor.landType !== landTile.landType) {
          landTile.setDepth(1);
          break;
        }
      }
    });

    let stillSearching = true;
    let depth = 1;
    while (stillSearching) {
      depth = depth + 1;
      if (depth > 20) {
        console.log('hit break');
        break;
      }

      stillSearching = false;
      landTiles.forEach((landTile) => {
        if (landTile.depth === depth) {
          let increase = true;
          landTile.neighbors.forEach((neighbor) => {
            if (neighbor.depth < depth) {
              increase = false;
            }
          });
          if (increase) {
            landTile.setDepth(depth + 1);
            stillSearching = true;
          }
        }
      });
    }
  }

  static assignCoords(landTiles: BaseLandTile[], realmLayout: number[]): void {
    let tileCounter = 0;
    for (let row = 0; row < realmLayout.length; row++) {
      landTiles[tileCounter].z = row - Math.floor(realmLayout.length / 2);
      landTiles[tileCounter].x = Math.floor(
        -0.5 * landTiles[tileCounter].z - (0.5 * realmLayout[row] - 0.5)
      );
      landTiles[tileCounter].y = -(
        landTiles[tileCounter].x + landTiles[tileCounter].z
      );

      let tempX = landTiles[tileCounter].x;
      let tempY = landTiles[tileCounter].y;
      let tempZ = landTiles[tileCounter].z;

      tileCounter = tileCounter + 1;

      for (let col = 1; col < realmLayout[row]; col++) {
        landTiles[tileCounter].x = tempX + col;
        landTiles[tileCounter].y = tempY - col;
        landTiles[tileCounter].z = tempZ;

        tileCounter = tileCounter + 1;
      }
    }
  }
}

export default BaseLandTile;
