import Server from '../Server/Server';
import RuntimeCard from '../Card/RuntimeCard';
import PlayerInfo from '../Player/PlayerInfo';
declare abstract class Queueline {
    server: Server;
    sourceCard: RuntimeCard;
    sourcePlayer: PlayerInfo;
    priority: number;
    fillBaseInfo(server: Server, sourceCard: RuntimeCard, sourcePlayer: PlayerInfo, priority: number): void;
    abstract sendEffectToDoEffect(queuePosition: number): void;
    areTargetsStillAvailable(): boolean;
    areTargetsStillRequired(): boolean;
    areAllSelectedTargetInfoItemsValid(): boolean;
    goOutForTargets(): void;
}
export default Queueline;
