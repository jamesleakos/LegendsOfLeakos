"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Phase_1 = require("../Enums/Phase");
var GameZone_1 = require("../Classes/Zone/GameZone");
var Phase_2 = __importDefault(require("../Classes/Phase/Phase"));
var Zone_1 = require("../Enums/Zone");
exports.default = {
    minPlayers: 2,
    maxPlayers: 2,
    realmLayout: [7, 10, 11, 12, 11, 12, 11, 10, 7],
    upgradeTreeShape: {
        width: 10,
        height: 6,
    },
    gameZones: [
        new GameZone_1.GameZoneType('Deck', Zone_1.ZoneEnum.Deck, Zone_1.ZoneOwner.Player, Zone_1.ZoneType.Static, Zone_1.ZoneOwnerVisibility.Hidden, Zone_1.ZoneOpponentVisibility.Hidden, false, 0),
        new GameZone_1.GameZoneType('Hand', Zone_1.ZoneEnum.Hand, Zone_1.ZoneOwner.Player, Zone_1.ZoneType.Dynamic, Zone_1.ZoneOwnerVisibility.Visible, Zone_1.ZoneOpponentVisibility.Hidden, false, 0),
        new GameZone_1.GameZoneType('FrontBoard', Zone_1.ZoneEnum.FrontBoard, Zone_1.ZoneOwner.Player, Zone_1.ZoneType.Dynamic, Zone_1.ZoneOwnerVisibility.Visible, Zone_1.ZoneOpponentVisibility.Visible, false, 0),
        new GameZone_1.GameZoneType('BackBoard', Zone_1.ZoneEnum.BackBoard, Zone_1.ZoneOwner.Player, Zone_1.ZoneType.Dynamic, Zone_1.ZoneOwnerVisibility.Visible, Zone_1.ZoneOpponentVisibility.Visible, false, 0),
        new GameZone_1.GameZoneType('Graveyard', Zone_1.ZoneEnum.Graveyard, Zone_1.ZoneOwner.Player, Zone_1.ZoneType.Static, Zone_1.ZoneOwnerVisibility.Visible, Zone_1.ZoneOpponentVisibility.Visible, false, 0),
        new GameZone_1.GameZoneType('BattleBoard', Zone_1.ZoneEnum.BattleBoard, Zone_1.ZoneOwner.Shared, Zone_1.ZoneType.Dynamic, Zone_1.ZoneOwnerVisibility.Visible, Zone_1.ZoneOpponentVisibility.Visible, false, 0),
    ],
    gamePhases: [
        new Phase_2.default(Phase_1.PhaseEnum.Recruit),
        new Phase_2.default(Phase_1.PhaseEnum.Maneuver),
        new Phase_2.default(Phase_1.PhaseEnum.Skirmish),
        new Phase_2.default(Phase_1.PhaseEnum.Battle),
    ],
    // cards and enchantments should be pulled from elsewhere - everything here should be well-defined in the code itselt
    // phase actions
    phasesCardsCanUpdateIn: [Phase_1.PhaseEnum.Skirmish, Phase_1.PhaseEnum.Battle],
    phasesCardsCanBePlayedIn: [Phase_1.PhaseEnum.Maneuver, Phase_1.PhaseEnum.Skirmish],
    phasesCardsCanMoveRowsIn: [
        Phase_1.PhaseEnum.Maneuver,
        Phase_1.PhaseEnum.Skirmish,
        Phase_1.PhaseEnum.Battle,
    ],
};
