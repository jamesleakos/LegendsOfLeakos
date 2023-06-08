const mongoose = require('mongoose');

//library card class properties as follows
// libraryId: number;
// cardTypeId: number;
// name: String;
// biomeType: BiomeType;
// biomeDepth: BiomeDepth;
// cardText: String;
// imageName: String;
// costs: PayResourceCost[] = [];

// deckRequirements: DeckRequirement[] = [];

// // stats - saved as numbers in the library card
// attack: number;
// health: number;
// priority: number;

// libraryKeywords: LibraryKeyword[] = [];
// activatedAbilities: ActivatedAbility[] = [];
// battlecryAbilities: BattlecryAbility[] = [];

// cardUpgrades: CardUpgrade[] = [];

const CardSchema = new mongoose.Schema({
  libraryId: {
    type: Number,
    required: true,
    unique: true
  },
  cardTypeId: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  biomeType: {
    type: String,
    required: true
  },
  biomeDepth: {
    type: String,
    required: true
  },
  cardText: {
    type: String,
    required: false
  },
  imageName: {
    type: String,
    required: false
  },
  // use cost schema
  costs: {
    type: Array,
    required: false
  },
});