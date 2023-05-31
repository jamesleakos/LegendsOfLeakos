"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PayResourceCost = /** @class */ (function () {
    function PayResourceCost(statId, value) {
        this.statId = statId;
        this.value = value;
    }
    PayResourceCost.prototype.getReadableString = function (statDefinitions) {
        var _this = this;
        var stat = statDefinitions.find(function (x) { return x.statId === _this.statId; });
        if (stat !== undefined) {
            return "Pay ".concat(this.value, " ").concat(stat.name.toLowerCase());
        }
        return null;
    };
    PayResourceCost.prototype.toJSON = function () {
        return {
            statId: this.statId,
            value: this.value,
        };
    };
    PayResourceCost.fromJSON = function (json) {
        return new PayResourceCost(json.statId, json.value);
    };
    return PayResourceCost;
}());
exports.default = PayResourceCost;
