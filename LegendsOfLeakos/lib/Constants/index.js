"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var gameSettings_1 = __importDefault(require("./gameSettings"));
var landTypes_1 = __importDefault(require("./landTypes"));
exports.default = {
    gameSettings: gameSettings_1.default,
    landTypes: landTypes_1.default
};
