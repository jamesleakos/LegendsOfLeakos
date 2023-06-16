const mongoose = require('mongoose');

import ModifiableIntSchema from '../ModifiableInt';

const PayResourceCostUpgradeSchema = new mongoose.Schema({
  statID: {
    type: Number,
    required: true,
  },
  valueChange: ModifiableIntSchema,
});

export default PayResourceCostUpgradeSchema;
