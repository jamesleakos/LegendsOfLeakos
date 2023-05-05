import { ZoneEnum } from '../../Enums/Zone';
import PlayerInfo from '../Player/PlayerInfo';
import RuntimeCard from '../Card/RuntimeCard';
import RuntimeEnchantment from '../Enchantment/RuntimeEnchantment';
import TargetableRuntimeEntity from '../Entity/TargetableRuntimeEntity';
import Effect from '../Effect/Effect';
import GameState from '../Game/GameState';
import TargetInfo from '../Target/TargetInfo';

class RuntimeZone extends TargetableRuntimeEntity {
  zoneId: number;
  zoneEnum: ZoneEnum;
  ownerPlayer: PlayerInfo;
  cards: RuntimeCard[] = [];
  enchantments: RuntimeEnchantment[] = [];
  protected _numCards: number;
  maxCards: number;
  onZoneChanged: (numCards: number) => void;
  onCardAdded: (card: RuntimeCard) => void;
  onCardRemoved: (card: RuntimeCard) => void;

  constructor(
    zoneId: number,
    instanceId: number,
    name: string,
    zoneEnum: ZoneEnum,
    ownerPlayer: PlayerInfo,
    maxCards: number
  ) {
    super();
    this.zoneId = zoneId;
    this.instanceId = instanceId;
    this.name = name;
    this.zoneEnum = zoneEnum;
    this.ownerPlayer = ownerPlayer;
    this.maxCards = maxCards;
  }

  get numCards(): number {
    return this._numCards;
  }

  set numCards(value: number) {
    this._numCards = value;
    if (this.onZoneChanged) {
      this.onZoneChanged(this._numCards);
    }
  }

  preResolveEffect(
    e: Effect,
    sourceCard: RuntimeCard,
    gameState: GameState,
    targetInfoList: TargetInfo[]
  ): void {
    for (const enchantment of this.enchantments) {
      enchantment.preResolveEffect(e, sourceCard, gameState, targetInfoList);
    }

    for (const card of this.cards) {
      card.preResolveEffect(e, sourceCard, gameState, targetInfoList);
    }
  }

  postResolveEffect(
    e: Effect,
    sourceCard: RuntimeCard,
    gameState: GameState,
    targetInfoList: TargetInfo[]
  ): void {
    for (const enchantment of this.enchantments) {
      enchantment.postResolveEffect(e, sourceCard, gameState, targetInfoList);
    }

    for (const card of this.cards) {
      card.postResolveEffect(e, sourceCard, gameState, targetInfoList);
    }
  }

  addCard(card: RuntimeCard): void {
    const cardToAdd = this.cards.find((c) => c.instanceId === card.instanceId);

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
  }

  addCardCreatedByEffect(card: RuntimeCard): void {
    const cardToAdd = this.cards.find((c) => c.instanceId === card.instanceId);

    if (this.cards.length < this.maxCards && cardToAdd === undefined) {
      this.addCard(card);
    }
  }

  removeCard(card: RuntimeCard): void {
    const cardToRemove = this.cards.find(
      (c) => c.instanceId === card.instanceId
    );

    if (cardToRemove === undefined) {
      return;
    }

    this.cards = this.cards.filter(
      (c) => c.instanceId !== cardToRemove.instanceId
    );
    this._numCards -= 1;

    if (this.onZoneChanged) {
      this.onZoneChanged(this.numCards);
    }

    if (this.onCardRemoved) {
      this.onCardRemoved(card);
    }
  }

  removeCards(amount: number): void {
    this.cards.splice(0, amount);
    this._numCards -= amount;

    if (this.onZoneChanged) {
      this.onZoneChanged(this.numCards);
    }
  }
}

export default RuntimeZone;
