const mongoose = require('mongoose');
import TargetTypeSchema from './TargetType';

const EffectSchema = new mongoose.Schema({
  effectEnum: {
    type: String,
    required: true
  },
  effectValueList: [EffectValueSchema],
  targetTypes: [TargetTypeSchema],
});

const EffectValueSchema = new mongoose.Schema({
  effectValueType: {
    type: String,
    required: true
  },
  setValue: {
    type: Number,
    required: true,
  },
  modInts: [ModifiableIntSchema],
});

export default EffectSchema;