const mongoose = require('mongoose');

import ModifiableIntSchema from '../ModifiableInt';

const StatUpgradeSchema = new mongoose.Schema({
  statId: {
    type: Number,
    required: true,
  },
  value: ModifiableIntSchema,
});

export default StatUpgradeSchema;