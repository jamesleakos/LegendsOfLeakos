import { PhaseEnum } from '../Enums/Phase';
import { GameZoneType } from '../Classes/Zone/GameZone';
import Phase from '../Classes/Phase/Phase';
declare const _default: {
    minPlayers: number;
    maxPlayers: number;
    realmLayout: number[];
    upgradeTreeShape: {
        width: number;
        height: number;
    };
    gameZones: GameZoneType[];
    gamePhases: Phase[];
    phasesCardsCanUpdateIn: PhaseEnum[];
    phasesCardsCanBePlayedIn: PhaseEnum[];
    phasesCardsCanMoveRowsIn: PhaseEnum[];
};
export default _default;
