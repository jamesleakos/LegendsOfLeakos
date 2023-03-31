"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var gameSettings_1 = __importDefault(require("./gameSettings"));
var ImageMapping_1 = __importDefault(require("./ImageMapping"));
exports.default = {
    gameSettings: gameSettings_1.default,
    imageMapping: ImageMapping_1.default,
};
