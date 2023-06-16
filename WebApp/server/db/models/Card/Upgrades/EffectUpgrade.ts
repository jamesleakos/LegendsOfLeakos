const mongoose = require('mongoose');

import TargetTypeUpgradeSchema from './TargetTypeUpgrade';
import ModifiableIntSchema from '../ModifiableInt';

const EffectValueUpgradeSchema = new mongoose.Schema({
  effectValueType: {
    type: String,
    required: true,
  },
  setValueChange: ModifiableIntSchema,
});

const EffectUpgradeSchema = new mongoose.Schema({
  effectEnum: {
    type: String,
    required: true,
  },
  effectValueUpgrades: [EffectValueUpgradeSchema],
  targetTypeUpgrades: [TargetTypeUpgradeSchema],
});

export default EffectUpgradeSchema;
