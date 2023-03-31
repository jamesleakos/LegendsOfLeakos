declare const _default: {
    gameSettings: {
        minPlayers: number;
        maxPlayers: number;
    };
    imageMapping: {
        landTypes: {
            desert: {
                all: string[];
                borders: {
                    fells: string[];
                    forest: string[];
                    mountain: any[];
                    ocean: any[];
                    prairie: any[];
                    tundra: string[];
                };
                deep: string[];
                mid: string[];
                shallow: string[];
            };
            fells: {
                all: string[];
                borders: {
                    desert: {};
                    forest: any[];
                    mountain: any[];
                    ocean: any[];
                    prairie: any[];
                    tundra: {};
                };
                deep: {};
                mid: {};
                shallow: any[];
            };
            forest: {
                all: string[];
                borders: {
                    desert: any[];
                    fells: any[];
                    mountain: any[];
                    ocean: any[];
                    prairie: any[];
                    tundra: string[];
                };
                deep: string[];
                mid: {};
                shallow: {};
            };
            mountain: {
                all: any[];
                borders: {
                    desert: string[];
                    fells: any[];
                    forest: any[];
                    ocean: any[];
                    prairie: any[];
                    tundra: string[];
                };
                deep: string[];
                mid: string[];
                shallow: string[];
            };
            ocean: {
                all: string[];
                borders: {
                    desert: any[];
                    fells: any[];
                    forest: any[];
                    mountain: any[];
                    prairie: any[];
                    tundra: any[];
                };
                deep: any[];
                mid: any[];
                shallow: any[];
            };
            prairie: {
                all: string[];
                borders: {
                    desert: string[];
                    fells: any[];
                    forest: any[];
                    mountain: any[];
                    ocean: any[];
                    tundra: string[];
                };
                deep: any[];
                mid: any[];
                shallow: any[];
            };
            tundra: {
                all: string[];
                borders: {
                    desert: any[];
                    fells: any[];
                    forest: any[];
                    mountain: any[];
                    ocean: any[];
                    prairie: any[];
                };
                deep: string[];
                mid: string[];
                shallow: string[];
            };
        };
    };
};
export default _default;
