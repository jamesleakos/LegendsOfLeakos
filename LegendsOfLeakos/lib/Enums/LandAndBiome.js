"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BiomeDepth = exports.BiomeType = exports.LandType = void 0;
var LandType;
(function (LandType) {
    LandType[LandType["forest"] = 0] = "forest";
    LandType[LandType["ocean"] = 1] = "ocean";
    LandType[LandType["desert"] = 2] = "desert";
    LandType[LandType["mountain"] = 3] = "mountain";
    LandType[LandType["prairie"] = 4] = "prairie";
    LandType[LandType["fells"] = 5] = "fells";
    LandType[LandType["tundra"] = 6] = "tundra";
})(LandType || (LandType = {}));
exports.LandType = LandType;
var BiomeType;
(function (BiomeType) {
    BiomeType[BiomeType["forest"] = 0] = "forest";
    BiomeType[BiomeType["ocean"] = 1] = "ocean";
    BiomeType[BiomeType["desert"] = 2] = "desert";
    BiomeType[BiomeType["mountain"] = 3] = "mountain";
    BiomeType[BiomeType["prairie"] = 4] = "prairie";
    BiomeType[BiomeType["fells"] = 5] = "fells";
    BiomeType[BiomeType["tundra"] = 6] = "tundra";
    BiomeType[BiomeType["world"] = 7] = "world";
})(BiomeType || (BiomeType = {}));
exports.BiomeType = BiomeType;
var BiomeDepth;
(function (BiomeDepth) {
    BiomeDepth[BiomeDepth["all"] = 0] = "all";
    BiomeDepth[BiomeDepth["shallow"] = 1] = "shallow";
    BiomeDepth[BiomeDepth["mid"] = 2] = "mid";
    BiomeDepth[BiomeDepth["deep"] = 3] = "deep";
})(BiomeDepth || (BiomeDepth = {}));
exports.BiomeDepth = BiomeDepth;
