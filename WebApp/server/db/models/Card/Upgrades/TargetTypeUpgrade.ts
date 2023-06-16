const mongoose = require('mongoose');

import ConditionSchema from '../Condition';
import ModifiableIntSchema from '../ModifiableInt';

const TargetTypeUpgradeSchema = new mongoose.Schema({
  targetTypeIndex: {
    type: Number,
    required: true,
  },
  newTargetTypeEnum: {
    type: String,
    required: true,
  },
  newTargetableTypeSelectionEnum: {
    type: String,
    required: true,
  },
  minSelectionsRequiredChange: ModifiableIntSchema,
  maxSelectionsAllowedChange: ModifiableIntSchema,
  minSelectionsThatMustRemainChange: ModifiableIntSchema,
  newConditions: [ConditionSchema],
  removeCondtionsOfType: [String],
});

export default TargetTypeUpgradeSchema;
