const mongoose = require('mongoose');
const ConditionSchema = require('./Condition');

const LibraryKeywordSchema = new mongoose.Schema({
  keywordType: {
    type: String,
    required: true,
  },
  indexForUpgrades: {
    type: Number,
    required: true,
  },
  designerDescription: {
    type: String,
    required: true,
  },
  isPermanent: {
    type: Boolean,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  startsActive: {
    type: Boolean,
    required: true,
  },
  keywordValueList: [LibraryKeywordValueSchema],
  conditions: [ConditionSchema],
  imageName: {
    type: String,
    required: true,
  },
});

const LibraryKeywordValueSchema = new mongoose.Schema({
  keywordValueType: {
    type: String,
    required: true,
  },
  values: [Number],
});

export default LibraryKeywordSchema;

