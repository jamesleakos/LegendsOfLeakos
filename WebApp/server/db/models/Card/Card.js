const mongoose = require('mongoose');
const PayResourceCostSchema = require('./PayResourceCost');
const DeckRequirementSchema = require('./DeckRequirement');
const LibraryKeywordSchema = require('./LibraryKeyword');
const ActivatedAbilitySchema = require('./ActivatedAbility');
const BattleAbilitySchema = require('./BattleAbility');
const CardUpgradeSchema = require('./CardUpgrade');

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
  costs: [PayResourceCostSchema],
  deckRequirements: [DeckRequirementSchema],
  libraryKeywords: [LibraryKeywordSchema],
  activatedAbilities: [ActivatedAbilitySchema],
  battleAbilities: [BattleAbilitySchema],
  cardUpgrades: [CardUpgradeSchema],
});

const Card = mongoose.model('cards', CardSchema);
export default Card;

