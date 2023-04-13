enum LandType {
  forest,
  ocean,
  desert,
  mountain,
  prairie,
  fells,
  tundra,
}

enum BiomeType {
  forest,
  ocean,
  desert,
  mountain,
  prairie,
  fells,
  tundra,
  world,
}

enum BiomeDepth {
  all,
  shallow,
  mid,
  deep,
}

enum BiomeAddCardEnum {
  Success,
  PartiallyAdded,
  Failure,
}

export { LandType, BiomeType, BiomeDepth, BiomeAddCardEnum };
