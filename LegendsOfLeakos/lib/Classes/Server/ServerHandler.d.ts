import Server from './Server';
declare class ServerHandler {
    protected server: Server;
    constructor(server: Server);
    registerNetworkHandlers(): void;
    unregisterNetworkHandlers(): void;
    onStartRecruitmentPhase(): void;
    onEndRecruitmentPhase(): void;
    onStartManeuverPhase(): void;
    onEndManeuverPhase(): void;
    onStartSkirmishPhase(): void;
    onEndSkirmishPhase(): void;
    onStartBattlePhase(): void;
    onEndBattlePhase(): void;
}
export default ServerHandler;
