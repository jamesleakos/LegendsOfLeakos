import GameManager from './GameManager';
import EffectSolver from './EffectSolver';
import RuntimeCard from '../Card/RuntimeCard';
import PlayerInfo from '../Player/PlayerInfo';
import RuntimeZone from '../Zone/RuntimeZone';
import TargetableRuntimeEntity from '../Entity/TargetableRuntimeEntity';

class GameState {
  gameManager: GameManager;
  players: PlayerInfo[] = [];
  effectSolver: EffectSolver;
  currentTurn: number;

  constructor(
    gameManager: GameManager,
    players: PlayerInfo[],
    effectSolver: EffectSolver
  ) {
    this.gameManager = gameManager;
    this.players = players;
    this.effectSolver = effectSolver;
    this.currentTurn = 0;
  }

  getCardFromAnywhere(cardInstanceId: number): RuntimeCard | null {
    let tempCard: RuntimeCard | null = null;
    for (let playerInfo of this.players) {
      tempCard = playerInfo.getCardFromInstanceId(cardInstanceId);
      if (tempCard != null) return tempCard;
    }
    return tempCard;
  }

  getZone(zoneInstanceId: number): RuntimeZone | null {
    let tempZone: RuntimeZone | null = null;
    for (let playerInfo of this.players) {
      tempZone = playerInfo.getZoneFromInstanceId(zoneInstanceId);
      if (tempZone != null) return tempZone;
    }
    return tempZone;
  }

  getEntityFromAnywhere(instanceId: number): TargetableRuntimeEntity | null {
    for (let playerInfo of this.players) {
      for (let zone of playerInfo.zones) {
        if (zone.instanceId === instanceId) return zone;
        for (let enchantment of zone.enchantments) {
          if (enchantment.instanceId === instanceId) return enchantment;
        }

        for (let card of zone.cards) {
          if (card.instanceId === instanceId) return card;
          for (let enchantment of card.enchantments) {
            if (enchantment.instanceId === instanceId) return enchantment;
          }
        }
      }
    }

    console.log('did not find the entity');
    return null;
  }
}

export default GameState;
