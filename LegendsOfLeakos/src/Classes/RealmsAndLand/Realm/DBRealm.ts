import LibraryBiome from '../Biome/LibraryBiome';
import LibraryLandTile from '../LandTile/LibraryLandTile';

class DBRealm {
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
      tiles.push(...biome.landTiles);
    }
    return tiles.sort((a, b) => a.id - b.id);
  }

  // Realm Utilities
  isRealmValid(): boolean {
    for (const biome of this.biomes) {
      if (!biome.areBiomeAndSubsValid().isValid) return false;
    }
    return true;
  }

  static copyRealm(oldRealm: DBRealm): DBRealm {
    const newRealm = new DBRealm();
    newRealm.name = oldRealm.name;
    for (const old of oldRealm.biomes) {
      newRealm.biomes.push(LibraryBiome.copyBiome(old));
    }
    return newRealm;
  }
}
