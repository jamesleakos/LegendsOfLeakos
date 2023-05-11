"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Keyword_1 = require("../../Enums/Keyword");
var LibraryKeywordValue_1 = __importDefault(require("./LibraryKeywordValue"));
var Condition_1 = require("../Condition/Condition");
var KeywordValue_1 = __importDefault(require("./KeywordValue"));
var LibraryKeyword = /** @class */ (function () {
    function LibraryKeyword(keywordType, indexForUpgrades, designerDescription, isPermanent, duration, startsActive, conditions, imageName) {
        this.conditions = [];
        this.keywordType = keywordType;
        this.indexForUpgrades = indexForUpgrades;
        this.designerDescription = designerDescription;
        this.isPermanent = isPermanent;
        this.duration = duration;
        this.startsActive = startsActive;
        this.imageName = imageName;
        this.keywordValueList =
            LibraryKeyword.requiredKeywordValues(keywordType).list;
        for (var _i = 0, conditions_1 = conditions; _i < conditions_1.length; _i++) {
            var c = conditions_1[_i];
            this.conditions.push(Condition_1.Condition.createCondition(c.conditionType, c.conditionValues).condition);
        }
    }
    // I'm not sure this will ever get used - we already have the KeywordTypeMethods over at RuntimeKeyword
    LibraryKeyword.prototype.canBeAssignedToCardByPlayer = function () {
        switch (this.keywordType) {
            case Keyword_1.KeywordType.DivineShield:
                return true;
            case Keyword_1.KeywordType.Impetus:
                return true;
            case Keyword_1.KeywordType.Skirmisher:
                return true;
            case Keyword_1.KeywordType.Provoke:
                return true;
            case Keyword_1.KeywordType.Meek:
                return true;
            case Keyword_1.KeywordType.Shielded:
                return false;
            case Keyword_1.KeywordType.Warleader:
                return true;
            default:
                throw new Error('That keyword is not in the list');
        }
    };
    LibraryKeyword.requiredKeywordValues = function (keywordType) {
        var requiredKeywordValues = [];
        switch (keywordType) {
            case Keyword_1.KeywordType.DivineShield:
                var numberOfValuesNeeded = 1;
                var setByDesigner = true;
                var intList = [];
                for (var i = 0; i < numberOfValuesNeeded; i++) {
                    intList.push(0);
                }
                var usesKV = new KeywordValue_1.default(Keyword_1.KeywordValueType.uses, intList);
                var usesLib = new LibraryKeywordValue_1.default(usesKV, numberOfValuesNeeded, setByDesigner);
                requiredKeywordValues.push(usesLib);
                return {
                    list: requiredKeywordValues,
                    wasSuccessful: true,
                    message: 'List successfully returned',
                };
            case Keyword_1.KeywordType.Impetus:
            case Keyword_1.KeywordType.Skirmisher:
            case Keyword_1.KeywordType.Provoke:
            case Keyword_1.KeywordType.Meek:
                return {
                    list: requiredKeywordValues,
                    wasSuccessful: true,
                    message: 'List successfully returned',
                };
            case Keyword_1.KeywordType.Shielded:
                return {
                    list: requiredKeywordValues,
                    wasSuccessful: false,
                    message: 'Creator can not assign this keyword type to a Library Card',
                };
            case Keyword_1.KeywordType.Warleader:
                var attackValuesNeeded = 1;
                var attackInts = [];
                for (var i = 0; i < attackValuesNeeded; i++) {
                    attackInts.push(0);
                }
                var attackStatBuff = new KeywordValue_1.default(Keyword_1.KeywordValueType.statCardBuffAttack, attackInts);
                var libraryAttackStatBuff = new LibraryKeywordValue_1.default(attackStatBuff, attackValuesNeeded, true);
                requiredKeywordValues.push(libraryAttackStatBuff);
                var healthValuesNeeded = 1;
                var healthInts = [];
                for (var i = 0; i < healthValuesNeeded; i++) {
                    healthInts.push(0);
                }
                var healthStatBuff = new KeywordValue_1.default(Keyword_1.KeywordValueType.statCardBuffHealth, healthInts);
                var libraryHealthStatBuff = new LibraryKeywordValue_1.default(healthStatBuff, healthValuesNeeded, true);
                requiredKeywordValues.push(libraryHealthStatBuff);
                return {
                    list: requiredKeywordValues,
                    wasSuccessful: true,
                    message: 'List successfully returned',
                };
            default:
                throw new Error('This keyword is not in the list, you must design it here');
        }
    };
    LibraryKeyword.prototype.getKeywordValueList = function () {
        var KVList = [];
        for (var _i = 0, _a = this.keywordValueList; _i < _a.length; _i++) {
            var lkv = _a[_i];
            var intlist = [];
            for (var _b = 0, _c = lkv.keywordValue.values; _b < _c.length; _b++) {
                var i = _c[_b];
                intlist.push(i);
            }
            var tempKV = new KeywordValue_1.default(lkv.keywordValue.keywordValueType, intlist);
            KVList.push(tempKV);
        }
        return KVList;
    };
    return LibraryKeyword;
}());
exports.default = LibraryKeyword;
