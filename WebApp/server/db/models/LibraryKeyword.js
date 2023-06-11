// keywordType: KeywordType;
// indexForUpgrades: number;
// designerDescription: string;
// isPermanent: boolean;
// duration: number;
// startsActive: boolean;
// keywordValueList: Array<LibraryKeywordValue>; // Don't need new, look down at the constructor
// conditions: Array<Condition> = [];
// imageName: string; // Don't need new, check out constructor

// using the above properties, make a model
const mongoose = require('mongoose');

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

export default LibraryKeywordSchema;

