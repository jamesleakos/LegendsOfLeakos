const PayResourceCostSchema = new mongoose.Schema({
  statId: {
    type: Number,
    required: true
  },
  value: {
    type: Number
  }
});