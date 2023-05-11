"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ModifiableInt_1 = __importDefault(require("../ModifableInt/ModifiableInt"));
var KeywordValueUpgrade = /** @class */ (function () {
    function KeywordValueUpgrade(keywordValueType, valueChanges) {
        var _this = this;
        this.valueChanges = [];
        this.keywordValueType = keywordValueType;
        valueChanges.forEach(function (c) {
            _this.valueChanges.push(new ModifiableInt_1.default(c.baseValue, __spreadArray([], c.intModifiers, true)));
        });
    }
    return KeywordValueUpgrade;
}());
exports.default = KeywordValueUpgrade;
