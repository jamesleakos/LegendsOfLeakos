const mongoose = require('mongoose');

const LandTileSchema = new mongoose.Schema({
  id: Number,
  x: Number,
  y: Number,
  z: Number,
  depth: Number,
  landType: Number,
});

const TerrainSchema = new mongoose.Schema({
  name: String,
  landTiles: [LandTileSchema],
});

const DeckSchema = new mongoose.Schema({
  name: String,
  cards: [String],
});

const BiomeSchema = new mongoose.Schema({
  biomeType: Number,
  biomeDepth: Number,
  deck: DeckSchema,
  terrain: TerrainSchema,
  subBiomes: [this],
});

const RealmSchema = new mongoose.Schema({
  name: String,
  biomes: [BiomeSchema],
});

const Realm = mongoose.model('realms', RealmSchema);

module.exports = {
  Realm,
};
