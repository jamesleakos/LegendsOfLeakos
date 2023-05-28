"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Target_1 = require("../../Enums/Target");
var Condition_1 = require("../Condition/Condition");
var CardCondition_1 = __importDefault(require("../Condition/CardCondition"));
var ZoneCondition_1 = __importDefault(require("../Condition/ZoneCondition"));
var TargetInfo_1 = __importDefault(require("./TargetInfo"));
var TargetType = /** @class */ (function () {
    function TargetType(name, targetTypeEnum, minSelectionsRequired, maxSelectionsAllowed, minSelectionsThatMustRemain, targetableTypeSelectionEnum, conditions) {
        this.conditions = [];
        this.name = name;
        this.targetTypeEnum = targetTypeEnum;
        this.minSelectionsRequired = minSelectionsRequired;
        this.maxSelectionsAllowed = maxSelectionsAllowed;
        this.minSelectionsThatMustRemain = minSelectionsThatMustRemain;
        this.targetableTypeSelectionEnum = targetableTypeSelectionEnum;
        this.playerSelectsTarget =
            Target_1.TargetableTypeSelectionEnumMethods.playerSelectsTargets(this.targetableTypeSelectionEnum);
        if (!Target_1.TargetTypeEnumMethods.canBeTargetable(this.targetTypeEnum)) {
            if (this.playerSelectsTarget) {
                console.log('Player can never select that target');
            }
            for (var _i = 0, conditions_1 = conditions; _i < conditions_1.length; _i++) {
                var c = conditions_1[_i];
                this.conditions.push(Condition_1.Condition.createCondition(c.conditionType, c.conditionValues)
                    .condition);
            }
        }
    }
    TargetType.prototype.getTargetTypeEnum = function () {
        return this.targetTypeEnum;
    };
    TargetType.prototype.autoSelectTargetInfo = function (sourcePlayer, sourceCard, gameState) {
        var cardInstanceIds = [];
        var zoneInstanceIds = [];
        // Implement the logic for each targetTypeEnum case here
        // ...
        var outCardInts = [];
        var outZoneInts = [];
        for (var i = 0; i < this.maxSelectionsAllowed; i++) {
            if (cardInstanceIds.length > i) {
                outCardInts.push(cardInstanceIds[i]);
            }
            if (zoneInstanceIds.length > i) {
                outZoneInts.push(zoneInstanceIds[i]);
            }
        }
        return new TargetInfo_1.default(outCardInts, outZoneInts, Target_1.TargetTypeEnumMethods.broadTargetType(this.targetTypeEnum) ===
            Target_1.BroadTargetTypeEnum.zone, cardInstanceIds.length === 0 && zoneInstanceIds.length === 0, false);
    };
    TargetType.prototype.cardSatisfiesConditions = function (sourceCard) {
        for (var _i = 0, _a = this.conditions; _i < _a.length; _i++) {
            var c = _a[_i];
            if (!(c instanceof CardCondition_1.default))
                return false;
            if (!c.isTrue(sourceCard))
                return false;
        }
        return true;
    };
    TargetType.prototype.zoneSatisfiesConditions = function (zone) {
        for (var _i = 0, _a = this.conditions; _i < _a.length; _i++) {
            var c = _a[_i];
            if (!(c instanceof ZoneCondition_1.default))
                return false;
            if (!c.isTrue(zone))
                return false;
        }
        return true;
    };
    TargetType.getFightTargetType = function () {
        return new TargetType('Attacking Target Type', Target_1.TargetTypeEnum.TargetOpponentCreature, 1, 1, 1, Target_1.TargetableTypeSelectionEnum.TargetableOnActivation, []);
    };
    TargetType.fromJSON = function (targetTypeJSON) {
        return new TargetType(targetTypeJSON.name, targetTypeJSON.targetTypeEnum, targetTypeJSON.minSelectionsRequired, targetTypeJSON.maxSelectionsAllowed, targetTypeJSON.minSelectionsThatMustRemain, targetTypeJSON.targetableTypeSelectionEnum, targetTypeJSON.conditions.map(function (c) { return Condition_1.Condition.fromJSON(c); }));
    };
    return TargetType;
}());
exports.default = TargetType;
