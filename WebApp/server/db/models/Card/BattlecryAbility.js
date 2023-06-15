const mongoose = require('mongoose');
const EffectSchema = require('./Effect');

const BattlecryAbilitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: true
  },
  effect: EffectSchema,
  usableInPhases: [String],
});

export default BattlecryAbilitySchema;