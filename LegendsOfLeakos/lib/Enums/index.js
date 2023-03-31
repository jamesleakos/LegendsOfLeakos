"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var landType_1 = __importDefault(require("./landType"));
var biomeDepth_1 = __importDefault(require("./biomeDepth"));
exports.default = {
    LandType: landType_1.default,
    BiomeDepth: biomeDepth_1.default,
};
