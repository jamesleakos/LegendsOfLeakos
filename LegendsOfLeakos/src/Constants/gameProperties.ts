import { PhaseEnum } from '../Enums/Phase';
import { GameZoneType } from '../Classes/Zone/GameZone';
import Phase from '../Classes/Phase/Phase';
import {
  ZoneEnum,
  ZoneEnumMethods,
  ZoneOwner,
  ZoneType,
  ZoneOwnerVisibility,
  ZoneOpponentVisibility,
} from '../Enums/Zone';

export default {
  minPlayers: 2,
  maxPlayers: 2,
  realmLayout: [7, 10, 11, 12, 11, 12, 11, 10, 7],
  upgradeTreeShape: {
    width: 10,
    height: 6,
  },
  gameZones: [
    new GameZoneType(
      'Deck',
      ZoneEnum.Deck,
      ZoneOwner.Player,
      ZoneType.Static,
      ZoneOwnerVisibility.Hidden,
      ZoneOpponentVisibility.Hidden,
      false,
      0
    ),
    new GameZoneType(
      'Hand',
      ZoneEnum.Hand,
      ZoneOwner.Player,
      ZoneType.Dynamic,
      ZoneOwnerVisibility.Visible,
      ZoneOpponentVisibility.Hidden,
      false,
      0
    ),
    new GameZoneType(
      'FrontBoard',
      ZoneEnum.FrontBoard,
      ZoneOwner.Player,
      ZoneType.Dynamic,
      ZoneOwnerVisibility.Visible,
      ZoneOpponentVisibility.Visible,
      false,
      0
    ),
    new GameZoneType(
      'BackBoard',
      ZoneEnum.BackBoard,
      ZoneOwner.Player,
      ZoneType.Dynamic,
      ZoneOwnerVisibility.Visible,
      ZoneOpponentVisibility.Visible,
      false,
      0
    ),
    new GameZoneType(
      'Graveyard',
      ZoneEnum.Graveyard,
      ZoneOwner.Player,
      ZoneType.Static,
      ZoneOwnerVisibility.Visible,
      ZoneOpponentVisibility.Visible,
      false,
      0
    ),
    new GameZoneType(
      'BattleBoard',
      ZoneEnum.BattleBoard,
      ZoneOwner.Shared,
      ZoneType.Dynamic,
      ZoneOwnerVisibility.Visible,
      ZoneOpponentVisibility.Visible,
      false,
      0
    ),
  ],
  gamePhases: [
    new Phase(PhaseEnum.Recruit),
    new Phase(PhaseEnum.Maneuver),
    new Phase(PhaseEnum.Skirmish),
    new Phase(PhaseEnum.Battle),
  ] as Phase[],

  // cards and enchantments should be pulled from elsewhere - everything here should be well-defined in the code itselt

  // phase actions
  phasesCardsCanUpdateIn: [PhaseEnum.Skirmish, PhaseEnum.Battle],
  phasesCardsCanBePlayedIn: [PhaseEnum.Maneuver, PhaseEnum.Skirmish],
  phasesCardsCanMoveRowsIn: [
    PhaseEnum.Maneuver,
    PhaseEnum.Skirmish,
    PhaseEnum.Battle,
  ],
};
