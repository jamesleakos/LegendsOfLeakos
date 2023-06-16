const mongoose = require('mongoose');
import ModifiableIntSchema from '../ModifiableInt';

const KeywordUpgradeSchema = new mongoose.Schema({
  keywordType: {
    type: String,
    required: true,
  },
  keywordUpgradeIndex: {
    type: Number,
    required: true,
  },
  isPermanent: {
    type: Boolean,
    required: true,
  },
  durationChange: ModifiableIntSchema,
  keywordValueUpgrades: [KeywordValueUpgradeSchema],
  isActive: {
    type: Boolean,
    required: true,
  },
});

const KeywordValueUpgradeSchema = new mongoose.Schema({
  keywordValueType: {
    type: String,
    required: true,
  },
  valueChanges: [ModifiableIntSchema],
});

export default KeywordUpgradeSchema;