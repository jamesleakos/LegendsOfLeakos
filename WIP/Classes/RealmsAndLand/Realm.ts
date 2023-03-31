import { Biome } from './Biome';
import { LandTile } from './LandTile';

export class Realm {
    name: string = "New EcoSystem";
    biomes: Biome[] = [];

    getNumCards(): number {
        let count = 0;
        for (const biome of this.biomes) {
            count += biome.getAllCardsCount();
        }
        return count;
    }

    deleteAllCards(): void {
        for (const biome of this.biomes) {
            biome.deleteAllCards();
        }
    }

    getTerrain(): LandTile[] {
        const tiles: LandTile[] = [];
        for (const biome of this.biomes) {
            tiles.push(...biome.terrain.landTiles);
        }
        return tiles.sort((a, b) => a.id - b.id);
    }

    isRealmValid(): boolean {
        for (const biome of this.biomes) {
            if (!biome.areBiomeAndSubsValid().isValid) {
                return false;
            }
        }
        return true;
    }

    static copyRealm(oldRealm: Realm): Realm {
        const newRealm = new Realm();
        newRealm.name = oldRealm.name;
        for (const old of oldRealm.biomes) {
            newRealm.biomes.push(Biome.copyBiome(old));
        }
        return newRealm;
    }
}
