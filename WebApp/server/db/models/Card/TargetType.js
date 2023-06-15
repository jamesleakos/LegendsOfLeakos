const mongoose = require('mongoose');
import ConditionSchema from './Condition';

const TargetTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  targetTypeEnum: {
    type: String,
    required: true,
  },
  minSelectionsRequired: {
    type: Number,
    required: true
  },
  maxSelectionsAllowed: {
    type: Number,
    required: true
  },
  minSelectionsThatMustRemain: {
    type: Number,
    required: true
  },
  targetableTypeSelectionEnum: {
    type: String,
    required: true
  },
  condtions: [ConditionSchema],
});

export default TargetTypeSchema;