declare const _default: {
    gameProperties: {
        minPlayers: number;
        maxPlayers: number;
        realmLayout: number[];
        upgradeTreeShape: {
            x: number;
            y: number;
        };
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
