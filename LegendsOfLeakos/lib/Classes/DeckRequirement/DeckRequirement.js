"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DeckRequirements_1 = require("../../Enums/DeckRequirements");
var CardAmountDeckRequirement_1 = __importDefault(require("./CardAmountDeckRequirement"));
var DepthAmountDeckRequirement_1 = __importDefault(require("./DepthAmountDeckRequirement"));
var FullCardPerCardRequirement_1 = __importDefault(require("./FullCardPerCardRequirement"));
var FullLandDepthPerCardRequirement_1 = __importDefault(require("./FullLandDepthPerCardRequirement"));
var LandAmountDeckRequirement_1 = __importDefault(require("./LandAmountDeckRequirement"));
var DeckRequirement = /** @class */ (function () {
    function DeckRequirement() {
    }
    DeckRequirement.fromJSON = function (json) {
        var reqType = json.type;
        switch (reqType) {
            case DeckRequirements_1.DeckReqType.CardAmount:
                return CardAmountDeckRequirement_1.default.fromJSON(json);
            case DeckRequirements_1.DeckReqType.FullCardPerCard:
                return FullCardPerCardRequirement_1.default.fromJSON(json);
            case DeckRequirements_1.DeckReqType.DepthAmount:
                return DepthAmountDeckRequirement_1.default.fromJSON(json);
            case DeckRequirements_1.DeckReqType.FullLandDepthPerCard:
                return FullLandDepthPerCardRequirement_1.default.fromJSON(json);
            case DeckRequirements_1.DeckReqType.LandAmount:
                return LandAmountDeckRequirement_1.default.fromJSON(json);
            default:
                throw new Error('Unknown DeckRequirement type: ' + reqType);
        }
    };
    return DeckRequirement;
}());
exports.default = DeckRequirement;
