import Server from '../Server/Server';
import RuntimeCard from '../Card/RuntimeCard';
import PlayerInfo from '../Player/PlayerInfo';

abstract class Queueline {
  server: Server;
  sourceCard: RuntimeCard;
  sourcePlayer: PlayerInfo;
  priority: number;

  // can't give a base class a constructor
  fillBaseInfo(
    server: Server,
    sourceCard: RuntimeCard,
    sourcePlayer: PlayerInfo,
    priority: number
  ): void {
    this.server = server;
    this.sourceCard = sourceCard;
    this.sourcePlayer = sourcePlayer;
    this.priority = priority;
  }

  abstract sendEffectToDoEffect(queuePosition: number): void;

  areTargetsStillAvailable(): boolean {
    return true;
  }

  areTargetsStillRequired(): boolean {
    return false;
  }

  areAllSelectedTargetInfoItemsValid(): boolean {
    return true;
  }

  goOutForTargets(): void {}
}

export default Queueline;
