const mongoose = require('mongoose');

const ConditionSchema = new mongoose.Schema({
  conditionType: {
    type: String,
    required: true
  },
  conditionValues: [conditionValueSchema]
});

const conditionValueSchema = new mongoose.Schema({
  conditionValueType: {
    type: String,
    required: true
  },
  values: [Number]
});

export default ConditionSchema;
