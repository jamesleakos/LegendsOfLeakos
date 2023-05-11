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
Object.defineProperty(exports, "__esModule", { value: true });
var KeywordValue = /** @class */ (function () {
    function KeywordValue(keywordValueType, values) {
        this.keywordValueType = keywordValueType;
        this.values = __spreadArray([], values, true);
    }
    return KeywordValue;
}());
exports.default = KeywordValue;
