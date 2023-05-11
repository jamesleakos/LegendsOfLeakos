"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TargetableTypeSelectionEnumMethods = exports.TargetTypeEnumMethods = exports.TargetableTypeSelectionEnum = exports.BroadTargetTypeEnum = exports.TargetTypeEnum = void 0;
var TargetTypeEnum;
(function (TargetTypeEnum) {
    TargetTypeEnum[TargetTypeEnum["TargetCreature"] = 0] = "TargetCreature";
    TargetTypeEnum[TargetTypeEnum["TargetOpponentCreature"] = 1] = "TargetOpponentCreature";
    TargetTypeEnum[TargetTypeEnum["TargetFriendlyCreature"] = 2] = "TargetFriendlyCreature";
    TargetTypeEnum[TargetTypeEnum["TargetRow"] = 3] = "TargetRow";
    TargetTypeEnum[TargetTypeEnum["TargetOpponentRow"] = 4] = "TargetOpponentRow";
    TargetTypeEnum[TargetTypeEnum["TargetFriendlyRow"] = 5] = "TargetFriendlyRow";
    TargetTypeEnum[TargetTypeEnum["OpponentFrontRow"] = 6] = "OpponentFrontRow";
    TargetTypeEnum[TargetTypeEnum["OpponentBackRow"] = 7] = "OpponentBackRow";
    TargetTypeEnum[TargetTypeEnum["FriendlyFrontRow"] = 8] = "FriendlyFrontRow";
    TargetTypeEnum[TargetTypeEnum["FriendlyBackRow"] = 9] = "FriendlyBackRow";
})(TargetTypeEnum || (TargetTypeEnum = {}));
exports.TargetTypeEnum = TargetTypeEnum;
var TargetTypeEnumMethods;
(function (TargetTypeEnumMethods) {
    function broadTargetType(targetTypeEnum) {
        switch (targetTypeEnum) {
            case TargetTypeEnum.TargetCreature:
                return BroadTargetTypeEnum.card;
            case TargetTypeEnum.TargetOpponentCreature:
                return BroadTargetTypeEnum.card;
            case TargetTypeEnum.TargetFriendlyCreature:
                return BroadTargetTypeEnum.card;
            case TargetTypeEnum.TargetOpponentRow:
                return BroadTargetTypeEnum.zone;
            case TargetTypeEnum.TargetRow:
                return BroadTargetTypeEnum.zone;
            case TargetTypeEnum.TargetFriendlyRow:
                return BroadTargetTypeEnum.zone;
            case TargetTypeEnum.OpponentFrontRow:
                return BroadTargetTypeEnum.zone;
            case TargetTypeEnum.OpponentBackRow:
                return BroadTargetTypeEnum.zone;
            case TargetTypeEnum.FriendlyFrontRow:
                return BroadTargetTypeEnum.zone;
            case TargetTypeEnum.FriendlyBackRow:
                return BroadTargetTypeEnum.zone;
            default:
                console.log('ERROR: missing conversion');
                return BroadTargetTypeEnum.card;
        }
    }
    TargetTypeEnumMethods.broadTargetType = broadTargetType;
    function canBeTargetable(targetTypeEnum) {
        switch (targetTypeEnum) {
            case TargetTypeEnum.TargetCreature:
                return true;
            case TargetTypeEnum.TargetOpponentCreature:
                return true;
            case TargetTypeEnum.TargetFriendlyCreature:
                return true;
            case TargetTypeEnum.TargetRow:
                return true;
            case TargetTypeEnum.TargetOpponentRow:
                return true;
            case TargetTypeEnum.TargetFriendlyRow:
                return true;
            case TargetTypeEnum.OpponentFrontRow:
                return false;
            case TargetTypeEnum.OpponentBackRow:
                return false;
            case TargetTypeEnum.FriendlyFrontRow:
                return false;
            case TargetTypeEnum.FriendlyBackRow:
                return false;
            default:
                console.log('ERROR: missing conversion');
                return false;
        }
    }
    TargetTypeEnumMethods.canBeTargetable = canBeTargetable;
})(TargetTypeEnumMethods || (TargetTypeEnumMethods = {}));
exports.TargetTypeEnumMethods = TargetTypeEnumMethods;
var BroadTargetTypeEnum;
(function (BroadTargetTypeEnum) {
    BroadTargetTypeEnum[BroadTargetTypeEnum["card"] = 0] = "card";
    BroadTargetTypeEnum[BroadTargetTypeEnum["zone"] = 1] = "zone";
})(BroadTargetTypeEnum || (BroadTargetTypeEnum = {}));
exports.BroadTargetTypeEnum = BroadTargetTypeEnum;
var TargetableTypeSelectionEnum;
(function (TargetableTypeSelectionEnum) {
    TargetableTypeSelectionEnum[TargetableTypeSelectionEnum["TargetableOnActivation"] = 0] = "TargetableOnActivation";
    TargetableTypeSelectionEnum[TargetableTypeSelectionEnum["TargetableOnQueueCall"] = 1] = "TargetableOnQueueCall";
    TargetableTypeSelectionEnum[TargetableTypeSelectionEnum["AutoTarget"] = 2] = "AutoTarget";
})(TargetableTypeSelectionEnum || (TargetableTypeSelectionEnum = {}));
exports.TargetableTypeSelectionEnum = TargetableTypeSelectionEnum;
var TargetableTypeSelectionEnumMethods;
(function (TargetableTypeSelectionEnumMethods) {
    function playerSelectsTargets(thisEnum) {
        switch (thisEnum) {
            case TargetableTypeSelectionEnum.TargetableOnActivation:
                return true;
            case TargetableTypeSelectionEnum.TargetableOnQueueCall:
                return true;
            case TargetableTypeSelectionEnum.AutoTarget:
                return false;
            default:
                console.log('ERROR: missing conversion');
                return false;
        }
    }
    TargetableTypeSelectionEnumMethods.playerSelectsTargets = playerSelectsTargets;
})(TargetableTypeSelectionEnumMethods || (TargetableTypeSelectionEnumMethods = {}));
exports.TargetableTypeSelectionEnumMethods = TargetableTypeSelectionEnumMethods;
