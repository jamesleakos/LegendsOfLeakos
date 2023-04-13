declare enum LandType {
    forest = 0,
    ocean = 1,
    desert = 2,
    mountain = 3,
    prairie = 4,
    fells = 5,
    tundra = 6
}
declare enum BiomeType {
    forest = 0,
    ocean = 1,
    desert = 2,
    mountain = 3,
    prairie = 4,
    fells = 5,
    tundra = 6,
    world = 7
}
declare enum BiomeDepth {
    all = 0,
    shallow = 1,
    mid = 2,
    deep = 3
}
declare enum BiomeAddCardEnum {
    Success = 0,
    PartiallyAdded = 1,
    Failure = 2
}
export { LandType, BiomeType, BiomeDepth, BiomeAddCardEnum };
