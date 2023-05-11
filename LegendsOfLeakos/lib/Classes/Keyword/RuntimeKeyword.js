"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Keyword_1 = require("../../Enums/Keyword");
var KeywordValue_1 = __importDefault(require("./KeywordValue"));
var Condition_1 = require("../Condition/Condition");
// child keywords
var MeekKeyword_1 = __importDefault(require("./Keywords/SimpleKeywords/MeekKeyword"));
var ImpetusKeyword_1 = __importDefault(require("./Keywords/SimpleKeywords/ImpetusKeyword"));
var ProvokeKeyword_1 = __importDefault(require("./Keywords/SimpleKeywords/ProvokeKeyword"));
var SkirmisherKeyword_1 = __importDefault(require("./Keywords/SimpleKeywords/SkirmisherKeyword"));
var OverkillKeyword_1 = __importDefault(require("./Keywords/SimpleKeywords/OverkillKeyword"));
var DivineShieldKeyword_1 = __importDefault(require("./Keywords/EffectModification/DivineShieldKeyword"));
var ShieldedKeyword_1 = __importDefault(require("./Keywords/EffectModification/ShieldedKeyword"));
var WarleaderKeyword_1 = __importDefault(require("./Keywords/StatModification/WarleaderKeyword"));
var RuntimeKeyword = /** @class */ (function () {
    function RuntimeKeyword() {
        this.keywordValueList = [];
        // conditions for stat buffs
        this.conditions = [];
    }
    RuntimeKeyword.prototype.setBaseData = function (myEntityId, keywordType, indexForUpgrades, description, isPermanent, duration, keywordValueList, isActive, conditions, imageName) {
        this.myEntityInstanceId = myEntityId;
        this.keywordType = keywordType;
        this.indexForUpgrades = indexForUpgrades;
        this.description = description;
        this.isPermanent = isPermanent;
        this.duration = duration;
        this.isActive = isActive;
        for (var _i = 0, keywordValueList_1 = keywordValueList; _i < keywordValueList_1.length; _i++) {
            var x = keywordValueList_1[_i];
            var tempIntList = [];
            for (var _a = 0, _b = x.values; _a < _b.length; _a++) {
                var i = _b[_a];
                tempIntList.push(i);
            }
            this.keywordValueList.push(new KeywordValue_1.default(x.keywordValueType, tempIntList));
        }
        for (var _c = 0, conditions_1 = conditions; _c < conditions_1.length; _c++) {
            var c = conditions_1[_c];
            this.conditions.push(Condition_1.Condition.createCondition(c.conditionType, c.conditionValues).condition);
        }
        this.imageName = imageName;
    };
    RuntimeKeyword.prototype.onEndTurn = function () {
        if (!this.isPermanent) {
            this.duration = this.duration - 1;
            if (this.duration <= 0) {
                this.myEntity.removeKeyword(this);
            }
        }
    };
    // This is for when we know we're just looking for one single value
    RuntimeKeyword.prototype.getKeywordValue = function (keywordValueType) {
        return this.keywordValueList.find(function (c) { return c.keywordValueType === keywordValueType; }).values[0];
    };
    // This is for when we know we're looking for a list
    RuntimeKeyword.prototype.getKeywordValues = function (keywordValueType) {
        return this.keywordValueList.find(function (c) { return c.keywordValueType === keywordValueType; }).values;
    };
    RuntimeKeyword.prototype.addStatBuff = function (stat, statCard, gameState) {
        return null;
    };
    RuntimeKeyword.prototype.preResolveEffect = function (myEnt, e, sourceCard, gameState, targetInfoList) { };
    RuntimeKeyword.prototype.postResolveEffect = function (myEnt, e, sourceCard, gameState, targetInfoList) { };
    RuntimeKeyword.createRuntimeKeyword = function (myEntityId, keywordType, indexForUpgrades, setDescription, isPermanent, setDuration, keywordValueList, isActive, conditions, imageName) {
        var outKeyword = null;
        if (keywordType === Keyword_1.KeywordType.Meek) {
            if (setDescription === '')
                setDescription = 'This unit does not prevent attacks into the back row';
            outKeyword = new MeekKeyword_1.default(myEntityId, keywordType, indexForUpgrades, setDescription, isPermanent, setDuration, keywordValueList, isActive, conditions, imageName);
        }
        if (keywordType === Keyword_1.KeywordType.Impetus) {
            if (setDescription === '')
                setDescription = 'This unit can move and attack in the same turn';
            outKeyword = new ImpetusKeyword_1.default(myEntityId, keywordType, indexForUpgrades, setDescription, isPermanent, setDuration, keywordValueList, isActive, conditions, imageName);
        }
        if (keywordType === Keyword_1.KeywordType.Provoke) {
            if (setDescription === '')
                setDescription = "I'm not sure what provoke is";
            outKeyword = new ProvokeKeyword_1.default(myEntityId, keywordType, indexForUpgrades, setDescription, isPermanent, setDuration, keywordValueList, isActive, conditions, imageName);
        }
        if (keywordType === Keyword_1.KeywordType.Skirmisher) {
            if (setDescription === '')
                setDescription = 'This unit can move and attack in the same turn';
            outKeyword = new SkirmisherKeyword_1.default(myEntityId, keywordType, indexForUpgrades, setDescription, isPermanent, setDuration, keywordValueList, isActive, conditions, imageName);
        }
        if (keywordType === Keyword_1.KeywordType.DivineShield) {
            if (setDescription === '')
                setDescription = 'When this unit takes damage, prevent it.';
            outKeyword = new DivineShieldKeyword_1.default(myEntityId, keywordType, indexForUpgrades, setDescription, isPermanent, setDuration, keywordValueList, isActive, conditions, imageName);
        }
        if (keywordType === Keyword_1.KeywordType.Shielded) {
            if (setDescription === '')
                setDescription = 'Reduce damage that this unit takes by some amount';
            outKeyword = new ShieldedKeyword_1.default(myEntityId, keywordType, indexForUpgrades, setDescription, isPermanent, setDuration, keywordValueList, isActive, conditions, imageName);
        }
        if (keywordType === Keyword_1.KeywordType.Overkill) {
            if (setDescription === '')
                setDescription =
                    "Damage in excess of blocker's health carries on to the next blocker or blocked unit";
            outKeyword = new OverkillKeyword_1.default(myEntityId, keywordType, indexForUpgrades, setDescription, isPermanent, setDuration, keywordValueList, isActive, conditions, imageName);
        }
        if (keywordType === Keyword_1.KeywordType.Warleader) {
            if (setDescription === '')
                setDescription =
                    'This keyword buffs conditional card stats some set scalar amount';
            outKeyword = new WarleaderKeyword_1.default(myEntityId, keywordType, indexForUpgrades, setDescription, isPermanent, setDuration, keywordValueList, isActive, conditions, imageName);
        }
        // here we check for possible errors and possible bad passes of effectValueList and TargetTypes
        var success = true;
        var message = 'Keyword created successfully';
        if (outKeyword === null) {
            success = false;
            message = 'Keyword was not created. Check if KeywordType was correct';
        }
        return {
            keyword: outKeyword,
            wasSuccessful: success,
            message: message,
        };
    };
    return RuntimeKeyword;
}());
exports.default = RuntimeKeyword;
