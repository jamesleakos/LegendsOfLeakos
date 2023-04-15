"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LibraryBiome_1 = __importDefault(require("../Biome/LibraryBiome"));
var LibraryLandTile_1 = __importDefault(require("../LandTile/LibraryLandTile"));
// enums
var LandAndBiome_1 = require("../../../Enums/LandAndBiome");
var LibraryRealm = /** @class */ (function () {
    function LibraryRealm() {
        this.name = 'New Realm';
        this.biomes = [];
        // #endregion
    }
    // Cards
    LibraryRealm.prototype.getNumCards = function () {
        var count = 0;
        for (var _i = 0, _a = this.biomes; _i < _a.length; _i++) {
            var biome = _a[_i];
            count += biome.getCardsCount();
        }
        return count;
    };
    LibraryRealm.prototype.deleteAllCards = function () {
        for (var _i = 0, _a = this.biomes; _i < _a.length; _i++) {
            var biome = _a[_i];
            biome.deleteAllCards();
        }
    };
    // Land Tiles
    LibraryRealm.prototype.getLandTiles = function () {
        var tiles = [];
        for (var _i = 0, _a = this.biomes; _i < _a.length; _i++) {
            var biome = _a[_i];
            tiles.push.apply(tiles, biome.landTiles);
        }
        return tiles.sort(function (a, b) { return a.id - b.id; });
    };
    LibraryRealm.prototype.changeLandTileType = function (tile_id, newLandType, cardLibrary, realmLayout) {
        if (cardLibrary === void 0) { cardLibrary = []; }
        if (realmLayout === void 0) { realmLayout = [7, 10, 11, 12, 11, 12, 11, 10, 7]; }
        var tiles = this.getLandTiles();
        // get the tile we want to change
        var tile = tiles.find(function (c) { return c.id === tile_id; });
        if (tile === undefined) {
            console.log('Error, tile not found');
            return;
        }
        tile.landType = newLandType;
        this.initalizeLandTiles(realmLayout);
        // TODO: update realm
        this.updateRealm(cardLibrary);
    };
    // Realm Utilities
    LibraryRealm.prototype.isRealmValid = function () {
        // make sure there's exactly one city
        var cities = this.getLandTiles().filter(function (c) { return c.landType === LandAndBiome_1.LandType.city; });
        if (cities.length !== 1)
            return false;
        // make sure all biomes are valid
        for (var _i = 0, _a = this.biomes; _i < _a.length; _i++) {
            var biome = _a[_i];
            if (!biome.areBiomeAndSubsValid().isValid)
                return false;
        }
        return true;
    };
    LibraryRealm.copyRealm = function (oldRealm) {
        var newRealm = new LibraryRealm();
        newRealm.name = oldRealm.name;
        for (var _i = 0, _a = oldRealm.biomes; _i < _a.length; _i++) {
            var old = _a[_i];
            newRealm.biomes.push(LibraryBiome_1.default.copyBiome(old));
        }
        newRealm.initalizeLandTiles();
        return newRealm;
    };
    // #region Updating Landtiles
    LibraryRealm.prototype.initalizeLandTiles = function (realmLayout) {
        if (realmLayout === void 0) { realmLayout = [7, 10, 11, 12, 11, 12, 11, 10, 7]; }
        var tiles = this.getLandTiles();
        LibraryLandTile_1.default.assignCoords(tiles, realmLayout);
        LibraryLandTile_1.default.assignNeighbors(tiles);
        LibraryLandTile_1.default.assignDepth(tiles);
    };
    LibraryRealm.prototype.updateRealm = function (cardLibrary) {
        if (cardLibrary === void 0) { cardLibrary = []; }
        var tempBiomes = [];
        var landTypeBiomeTypePairs = [
            [LandAndBiome_1.LandType.forest, LandAndBiome_1.BiomeType.forest],
            [LandAndBiome_1.LandType.ocean, LandAndBiome_1.BiomeType.ocean],
            [LandAndBiome_1.LandType.desert, LandAndBiome_1.BiomeType.desert],
            [LandAndBiome_1.LandType.mountain, LandAndBiome_1.BiomeType.mountain],
            [LandAndBiome_1.LandType.prairie, LandAndBiome_1.BiomeType.prairie],
            [LandAndBiome_1.LandType.fells, LandAndBiome_1.BiomeType.fells],
            [LandAndBiome_1.LandType.tundra, LandAndBiome_1.BiomeType.tundra],
            [LandAndBiome_1.LandType.city, LandAndBiome_1.BiomeType.city],
        ];
        var landTiles = this.getLandTiles();
        for (var _i = 0, landTypeBiomeTypePairs_1 = landTypeBiomeTypePairs; _i < landTypeBiomeTypePairs_1.length; _i++) {
            var _a = landTypeBiomeTypePairs_1[_i], landType = _a[0], biomeType = _a[1];
            for (var _b = 0, landTiles_1 = landTiles; _b < landTiles_1.length; _b++) {
                var landTile = landTiles_1[_b];
                if (landTile.landType === landType) {
                    LibraryRealm.biomeAdder(landTile, landTiles, biomeType, tempBiomes);
                }
            }
        }
        // TODO: what the heck is this for - we're wiping it and then trying to use it
        this.biomes = [];
        var _loop_1 = function (newBiome) {
            var oldBiomes = this_1.biomes.filter(function (c) { return c.biomeType === newBiome.biomeType; });
            for (var _d = 0, oldBiomes_1 = oldBiomes; _d < oldBiomes_1.length; _d++) {
                var oldBiome = oldBiomes_1[_d];
                var intersection = oldBiome.landTiles.filter(function (value) {
                    return newBiome.landTiles.includes(value);
                });
                if (intersection.length > 0) {
                    var _loop_2 = function (cardEntry) {
                        var message = newBiome.addCardsToBiomeOrSubbiome(cardLibrary.find(function (c) { return c.libraryId === cardEntry.libraryId; }), cardEntry.amount);
                        if (message.result !== LandAndBiome_1.BiomeAddCardEnum.Success) {
                            console.log(message.message);
                        }
                    };
                    for (var _e = 0, _f = oldBiome.cards; _e < _f.length; _e++) {
                        var cardEntry = _f[_e];
                        _loop_2(cardEntry);
                    }
                }
            }
            this_1.biomes.push(LibraryBiome_1.default.copyBiome(newBiome));
        };
        var this_1 = this;
        for (var _c = 0, tempBiomes_1 = tempBiomes; _c < tempBiomes_1.length; _c++) {
            var newBiome = tempBiomes_1[_c];
            _loop_1(newBiome);
        }
    };
    LibraryRealm.biomeAdder = function (landTile, landTiles, biomeType, tempBiomes) {
        var biomes = tempBiomes.filter(function (c) { return c.biomeType === biomeType; });
        var found = false;
        for (var _i = 0, biomes_1 = biomes; _i < biomes_1.length; _i++) {
            var biome = biomes_1[_i];
            var newSortedTile = biome.landTiles.find(function (c) { return c.id === landTile.id; });
            if (newSortedTile !== undefined) {
                found = true;
            }
        }
        if (!found) {
            var tempBiome = new LibraryBiome_1.default();
            tempBiome.biomeType = biomeType;
            tempBiome.biomeDepth = LandAndBiome_1.BiomeDepth.all;
            tempBiome.cards = [];
            tempBiome.landTiles = [];
            tempBiomes.push(tempBiome);
            LibraryRealm.recursiveTileAdder(landTile, tempBiome);
            LibraryLandTile_1.default.assignDepth(landTiles);
            // And then we add subBiomes
            var shallowBiome = new LibraryBiome_1.default();
            shallowBiome.biomeType = biomeType;
            shallowBiome.biomeDepth = LandAndBiome_1.BiomeDepth.shallow;
            shallowBiome.cards = [];
            shallowBiome.landTiles = [];
            tempBiome.subBiomes.push(shallowBiome);
            var midBiome = new LibraryBiome_1.default();
            midBiome.biomeType = biomeType;
            midBiome.biomeDepth = LandAndBiome_1.BiomeDepth.mid;
            midBiome.cards = [];
            midBiome.landTiles = [];
            tempBiome.subBiomes.push(midBiome);
            var deepBiome = new LibraryBiome_1.default();
            deepBiome.biomeType = biomeType;
            deepBiome.biomeDepth = LandAndBiome_1.BiomeDepth.deep;
            deepBiome.cards = [];
            deepBiome.landTiles = [];
            tempBiome.subBiomes.push(deepBiome);
            for (var _a = 0, _b = tempBiome.landTiles; _a < _b.length; _a++) {
                var lt = _b[_a];
                if (lt.depth === 1) {
                    shallowBiome.landTiles.push(lt);
                }
                else if (lt.depth === 2) {
                    midBiome.landTiles.push(lt);
                }
                else if (lt.depth > 2) {
                    deepBiome.landTiles.push(lt);
                }
                else {
                    console.log('Error, please check this. lt.depth == ' + lt.depth.toString());
                }
            }
            tempBiome.subBiomes = tempBiome.subBiomes.filter(function (c) { return c.landTiles.length > 0; });
        }
    };
    LibraryRealm.recursiveTileAdder = function (landTile, tempBiome) {
        tempBiome.landTiles.push(landTile);
        var _loop_3 = function (neighbor) {
            if (neighbor.landType === landTile.landType) {
                var sortedTile = tempBiome.landTiles.find(function (c) { return c.id === neighbor.id; });
                if (sortedTile === undefined) {
                    this_2.recursiveTileAdder(neighbor, tempBiome);
                }
            }
        };
        var this_2 = this;
        for (var _i = 0, _a = landTile.neighbors; _i < _a.length; _i++) {
            var neighbor = _a[_i];
            _loop_3(neighbor);
        }
    };
    // #endregion
    // #region JSON Conversion
    LibraryRealm.fromJSON = function (json) {
        var realm = new LibraryRealm();
        realm.name = json.name;
        realm.biomes = [];
        for (var _i = 0, _a = json.biomes; _i < _a.length; _i++) {
            var biome = _a[_i];
            realm.biomes.push(LibraryBiome_1.default.fromJSON(biome));
        }
        realm.initalizeLandTiles();
        // should already have depth and coordinates assigned
        return realm;
    };
    LibraryRealm.prototype.toJSON = function (realm) {
        var json = {};
        json.name = realm.name;
        json.biomes = [];
        for (var _i = 0, _a = realm.biomes; _i < _a.length; _i++) {
            var biome = _a[_i];
            json.biomes.push(biome.toJSON());
        }
        return json;
    };
    return LibraryRealm;
}());
exports.default = LibraryRealm;
