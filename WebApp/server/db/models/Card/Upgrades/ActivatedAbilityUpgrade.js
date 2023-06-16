const mongoose = require('mongoose');
const ModifiableIntSchema = require('../ModifiableInt');
const EffectUpgradeSchema = require('./EffectUpgrade');
const PayResourceCostUpgradeSchema = require('./PayResourceCostUpgrade');

const ActivatedAbilityUpgradeSchema = new mongoose.Schema({
  abilityUpgradeIndex: {
    type: Number,
    required: true,
  },
  effectUpgrade: EffectUpgradeSchema,
  addUsablePhases: [String],
  removeUsablePhases: [String],
  costUpgrades: [PayResourceCostUpgradeSchema],
  usesPerTurnChange: ModifiableIntSchema,
  isActive: {
    type: Boolean,
    required: true,
  },
});

export default ActivatedAbilityUpgradeSchema;