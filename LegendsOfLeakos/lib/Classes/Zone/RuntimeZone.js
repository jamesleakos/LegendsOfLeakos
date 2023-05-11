"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var TargetableRuntimeEntity_1 = __importDefault(require("../Entity/TargetableRuntimeEntity"));
var RuntimeZone = /** @class */ (function (_super) {
    __extends(RuntimeZone, _super);
    function RuntimeZone(zoneId, instanceId, name, zoneEnum, ownerPlayer, maxCards) {
        var _this = _super.call(this) || this;
        _this.cards = [];
        _this.enchantments = [];
        _this.zoneId = zoneId;
        _this.instanceId = instanceId;
        _this.name = name;
        _this.zoneEnum = zoneEnum;
        _this.ownerPlayer = ownerPlayer;
        _this.maxCards = maxCards;
        return _this;
    }
    Object.defineProperty(RuntimeZone.prototype, "numCards", {
        get: function () {
            return this._numCards;
        },
        set: function (value) {
            this._numCards = value;
            if (this.onZoneChanged) {
                this.onZoneChanged(this._numCards);
            }
        },
        enumerable: false,
        configurable: true
    });
    RuntimeZone.prototype.preResolveEffect = function (e, sourceCard, gameState, targetInfoList) {
        for (var _i = 0, _a = this.enchantments; _i < _a.length; _i++) {
            var enchantment = _a[_i];
            enchantment.preResolveEffect(e, sourceCard, gameState, targetInfoList);
        }
        for (var _b = 0, _c = this.cards; _b < _c.length; _b++) {
            var card = _c[_b];
            card.preResolveEffect(e, sourceCard, gameState, targetInfoList);
        }
    };
    RuntimeZone.prototype.postResolveEffect = function (e, sourceCard, gameState, targetInfoList) {
        for (var _i = 0, _a = this.enchantments; _i < _a.length; _i++) {
            var enchantment = _a[_i];
            enchantment.postResolveEffect(e, sourceCard, gameState, targetInfoList);
        }
        for (var _b = 0, _c = this.cards; _b < _c.length; _b++) {
            var card = _c[_b];
            card.postResolveEffect(e, sourceCard, gameState, targetInfoList);
        }
    };
    RuntimeZone.prototype.addCard = function (card) {
        var cardToAdd = this.cards.find(function (c) { return c.instanceId === card.instanceId; });
        if (this.cards.length < this.maxCards && cardToAdd === undefined) {
            this.cards.push(card);
            card.residingZone = this;
            this._numCards += 1;
            if (this.onZoneChanged) {
                this.onZoneChanged(this.numCards);
            }
            if (this.onCardAdded) {
                this.onCardAdded(card);
            }
        }
    };
    RuntimeZone.prototype.addCardCreatedByEffect = function (card) {
        var cardToAdd = this.cards.find(function (c) { return c.instanceId === card.instanceId; });
        if (this.cards.length < this.maxCards && cardToAdd === undefined) {
            this.addCard(card);
        }
    };
    RuntimeZone.prototype.removeCard = function (card) {
        var cardToRemove = this.cards.find(function (c) { return c.instanceId === card.instanceId; });
        if (cardToRemove === undefined) {
            return;
        }
        this.cards = this.cards.filter(function (c) { return c.instanceId !== cardToRemove.instanceId; });
        this._numCards -= 1;
        if (this.onZoneChanged) {
            this.onZoneChanged(this.numCards);
        }
        if (this.onCardRemoved) {
            this.onCardRemoved(card);
        }
    };
    RuntimeZone.prototype.removeCards = function (amount) {
        this.cards.splice(0, amount);
        this._numCards -= amount;
        if (this.onZoneChanged) {
            this.onZoneChanged(this.numCards);
        }
    };
    return RuntimeZone;
}(TargetableRuntimeEntity_1.default));
exports.default = RuntimeZone;
