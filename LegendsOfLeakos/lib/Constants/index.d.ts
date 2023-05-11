declare const _default: {
    gameProperties: {
        minPlayers: number;
        maxPlayers: number;
        realmLayout: number[];
        upgradeTreeShape: {
            width: number;
            height: number;
        };
        gameZones: import("../Classes/Zone/GameZone").GameZoneType[];
        gamePhases: import("../Classes/Phase/Phase").default[];
        phasesCardsCanUpdateIn: import("../Enums/Phase").PhaseEnum[];
        phasesCardsCanBePlayedIn: import("../Enums/Phase").PhaseEnum[];
        phasesCardsCanMoveRowsIn: import("../Enums/Phase").PhaseEnum[];
    };
    imageMapping: {
        landTypes: {
            mapping: any;
            stringsToUrl: (type: string, depth: string, mapObj?: any) => string;
            intsToUrl: (type: number, depth: number, mapObj?: any) => string;
        };
    };
};
export default _default;
