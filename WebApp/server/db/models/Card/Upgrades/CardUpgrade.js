const mongoose = require('mongoose');

import ActivatedAbilitySchema from '../ActivatedAbility';
import PayResourceCostSchema from '../PayResourceCost';
import StatUpgradeSchema from '../StatUpgrade';

const CardUpgradeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  upgradeIndex: {
    type: Number,
    required: true,
  },
  isStartingUpgrade: {
    type: Boolean,
    required: true,
  },
  activatedAbility: ActivatedAbilitySchema,
  costs: [PayResourceCostSchema],
  upgradeNeighbors: [Number],
  description: {
    type: String,
    required: false
  },
  attackStatUpgrade: StatUpgradeSchema,
  lifeStatUpgrade: StatUpgradeSchema,
  priorityStatUpgrade: StatUpgradeSchema,
  keywordUpgrades: [KeywordUpgradeSchema],
  activatedAbilityUpgrades: [ActivatedAbilityUpgradeSchema],
});

export default CardUpgradeSchema;
