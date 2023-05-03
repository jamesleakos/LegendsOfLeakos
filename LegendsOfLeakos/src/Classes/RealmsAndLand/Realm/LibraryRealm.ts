import LibraryBiome from '../Biome/LibraryBiome';
import LibraryLandTile from '../LandTile/LibraryLandTile';
import LibraryCard from '../../Card/LibraryCard';
// enums
import {
  BiomeType,
  BiomeDepth,
  LandType,
  BiomeAddCardEnum,
} from '../../../Enums/LandAndBiome';

class LibraryRealm {
  name: string = 'New Realm';
  biomes: LibraryBiome[] = [];

  // Cards
  getNumCards(): number {
    let count = 0;
    for (const biome of this.biomes) {
      count += biome.getCardsCount();
    }
    return count;
  }

  deleteAllCards(): void {
    for (const biome of this.biomes) {
      biome.deleteAllCards();
    }
  }

  // Land Tiles
  getLandTiles(): LibraryLandTile[] {
    const tiles: LibraryLandTile[] = [];
    for (const biome of this.biomes) {
      tiles.push(...biome.getLandTiles());
    }
    return tiles.sort((a, b) => a.id - b.id);
  }

  changeLandTileType(
    tile_id: number,
    newLandType: LandType,
    cardLibrary: LibraryCard[] = [],
    realmLayout: any = [7, 10, 11, 12, 11, 12, 11, 10, 7]
  ): void {
    const tiles = this.getLandTiles();
    // get the tile we want to change
    const tile = tiles.find((c) => c.id === tile_id);
    if (tile === undefined) {
      console.log('Error, tile not found');
      return;
    }
    tile.landType = newLandType;
    this.initalizeLandTiles(realmLayout);
    // TODO: update realm
    this.updateRealm(cardLibrary);
  }

  // Realm Utilities
  isRealmValid(realmLayout: any = [7, 10, 11, 12, 11, 12, 11, 10, 7]): boolean {
    // REALM STUFF

    // make sure there's exactly one city
    const cities = this.getLandTiles().filter(
      (c) => c.landType === LandType.city
    );
    if (cities.length !== 1) {
      console.log('Error, not exactly one city');
      return false;
    }

    // make sure that there are the right amount of land tiles
    const landTiles = this.getLandTiles();
    const layoutSum = realmLayout.reduce((a: number, b: number) => a + b, 0);
    if (landTiles.length !== layoutSum) {
      console.log('Error, tiles dont match');
      return false;
    }

    // just try to init the tiles
    try {
      this.initalizeLandTiles();
    } catch {
      console.log('Error, couldnt init tiles');
      return false;
    }

    // BIOME STUFF
    // make sure all biomes are valid
    for (const biome of this.biomes) {
      if (!biome.areBiomeAndSubsValid()) {
        console.log('Error, biome not valid');
        return false;
      }
    }
    return true;
  }

  static copyRealm(oldRealm: LibraryRealm): LibraryRealm {
    const newRealm = new LibraryRealm();
    newRealm.name = oldRealm.name;
    for (const old of oldRealm.biomes) {
      newRealm.biomes.push(LibraryBiome.copyBiome(old));
    }
    newRealm.initalizeLandTiles();
    return newRealm;
  }

  // #region Updating Landtiles

  initalizeLandTiles(
    realmLayout: any = [7, 10, 11, 12, 11, 12, 11, 10, 7]
  ): void {
    const tiles = this.getLandTiles();
    LibraryLandTile.assignCoords(tiles, realmLayout);
    LibraryLandTile.assignNeighbors(tiles);
    LibraryLandTile.assignDepth(tiles);
  }

  updateRealm(cardLibrary: LibraryCard[] = []): void {
    const tempBiomes: LibraryBiome[] = [];

    const landTypeBiomeTypePairs: [LandType, BiomeType][] = [
      [LandType.forest, BiomeType.forest],
      [LandType.ocean, BiomeType.ocean],
      [LandType.desert, BiomeType.desert],
      [LandType.mountain, BiomeType.mountain],
      [LandType.prairie, BiomeType.prairie],
      [LandType.fells, BiomeType.fells],
      [LandType.tundra, BiomeType.tundra],
      [LandType.city, BiomeType.city],
    ];

    const landTiles = this.getLandTiles();
    for (const [landType, biomeType] of landTypeBiomeTypePairs) {
      for (const landTile of landTiles) {
        if (landTile.landType === landType) {
          LibraryRealm.biomeAdder(landTile, landTiles, biomeType, tempBiomes);
        }
      }
    }

    // TODO: what the heck is this for - we're wiping it and then trying to use it
    this.biomes = [];

    for (let newBiome of tempBiomes) {
      const oldBiomes = this.biomes.filter(
        (c) => c.biomeType === newBiome.biomeType
      );

      for (let oldBiome of oldBiomes) {
        const intersection = oldBiome.landTiles.filter((value) =>
          newBiome.landTiles.includes(value)
        );

        if (intersection.length > 0) {
          for (let cardEntry of oldBiome.cards) {
            const message = newBiome.addCardsToBiomeOrSubbiome(
              cardLibrary.find((c) => c.libraryId === cardEntry.libraryId),
              cardEntry.amount
            );

            if (message.result !== BiomeAddCardEnum.Success) {
              console.log(message.message);
            }
          }
        }
      }

      this.biomes.push(LibraryBiome.copyBiome(newBiome));
    }
  }

  static biomeAdder(
    landTile: LibraryLandTile,
    landTiles: LibraryLandTile[],
    biomeType: BiomeType,
    tempBiomes: LibraryBiome[]
  ): void {
    const biomes = tempBiomes.filter((c) => c.biomeType === biomeType);
    let found = false;
    for (const biome of biomes) {
      const newSortedTile = biome.landTiles.find((c) => c.id === landTile.id);
      if (newSortedTile !== undefined) {
        found = true;
      }
    }
    if (!found) {
      const tempBiome = new LibraryBiome();
      tempBiome.biomeType = biomeType;
      tempBiome.biomeDepth = BiomeDepth.all;
      tempBiome.cards = [];
      tempBiome.landTiles = [];
      tempBiomes.push(tempBiome);

      LibraryRealm.recursiveTileAdder(landTile, tempBiome);
      LibraryLandTile.assignDepth(landTiles);

      // And then we add subBiomes
      const shallowBiome = new LibraryBiome();
      shallowBiome.biomeType = biomeType;
      shallowBiome.biomeDepth = BiomeDepth.shallow;
      shallowBiome.cards = [];
      shallowBiome.landTiles = [];
      tempBiome.subBiomes.push(shallowBiome);

      const midBiome = new LibraryBiome();
      midBiome.biomeType = biomeType;
      midBiome.biomeDepth = BiomeDepth.mid;
      midBiome.cards = [];
      midBiome.landTiles = [];
      tempBiome.subBiomes.push(midBiome);

      const deepBiome = new LibraryBiome();
      deepBiome.biomeType = biomeType;
      deepBiome.biomeDepth = BiomeDepth.deep;
      deepBiome.cards = [];
      deepBiome.landTiles = [];
      tempBiome.subBiomes.push(deepBiome);

      for (const lt of tempBiome.landTiles) {
        if (lt.depth === 1) {
          shallowBiome.landTiles.push(lt);
        } else if (lt.depth === 2) {
          midBiome.landTiles.push(lt);
        } else if (lt.depth > 2) {
          deepBiome.landTiles.push(lt);
        } else {
          console.log(
            'Error, please check this. lt.depth == ' + lt.depth.toString()
          );
        }
      }

      tempBiome.subBiomes = tempBiome.subBiomes.filter(
        (c) => c.landTiles.length > 0
      );
    }
  }

  public static recursiveTileAdder(
    landTile: LibraryLandTile,
    tempBiome: LibraryBiome
  ): void {
    tempBiome.landTiles.push(landTile);
    for (const neighbor of landTile.neighbors) {
      if (neighbor.landType === landTile.landType) {
        const sortedTile = tempBiome.landTiles.find(
          (c) => c.id === neighbor.id
        );
        if (sortedTile === undefined) {
          this.recursiveTileAdder(neighbor as LibraryLandTile, tempBiome);
        }
      }
    }
  }

  // #endregion

  // #region JSON Conversion

  static fromJSON(json: any): LibraryRealm {
    const realm = new LibraryRealm();
    realm.name = json.name;
    realm.biomes = [];
    for (const biome of json.biomes) {
      realm.biomes.push(LibraryBiome.fromJSON(biome));
    }
    realm.initalizeLandTiles();
    // should already have depth and coordinates assigned

    return realm;
  }

  toJSON(): any {
    const json: any = {};
    json.name = this.name;
    json.biomes = [];
    for (const biome of this.biomes) {
      json.biomes.push(biome.toJSON());
    }
    return json;
  }

  // #endregion
}

export default LibraryRealm;
