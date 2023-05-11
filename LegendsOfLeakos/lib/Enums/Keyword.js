"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeywordValueType = exports.KeywordType = void 0;
var KeywordType;
(function (KeywordType) {
    KeywordType[KeywordType["DivineShield"] = 0] = "DivineShield";
    KeywordType[KeywordType["Impetus"] = 1] = "Impetus";
    KeywordType[KeywordType["Skirmisher"] = 2] = "Skirmisher";
    KeywordType[KeywordType["Provoke"] = 3] = "Provoke";
    KeywordType[KeywordType["Meek"] = 4] = "Meek";
    KeywordType[KeywordType["Shielded"] = 5] = "Shielded";
    KeywordType[KeywordType["Overkill"] = 6] = "Overkill";
    KeywordType[KeywordType["Multiwield"] = 7] = "Multiwield";
    KeywordType[KeywordType["Warleader"] = 8] = "Warleader";
})(KeywordType || (KeywordType = {}));
exports.KeywordType = KeywordType;
var KeywordValueType;
(function (KeywordValueType) {
    KeywordValueType[KeywordValueType["uses"] = 0] = "uses";
    KeywordValueType[KeywordValueType["shieldingCardInstanceId"] = 1] = "shieldingCardInstanceId";
    KeywordValueType[KeywordValueType["shieldAmount"] = 2] = "shieldAmount";
    KeywordValueType[KeywordValueType["statCardBuffAttack"] = 3] = "statCardBuffAttack";
    KeywordValueType[KeywordValueType["statCardBuffHealth"] = 4] = "statCardBuffHealth";
})(KeywordValueType || (KeywordValueType = {}));
exports.KeywordValueType = KeywordValueType;
