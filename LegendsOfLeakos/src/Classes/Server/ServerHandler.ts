import Server from './Server';

class ServerHandler {
  // Convenient access to the server itself.
  protected server: Server;

  // Constructor.
  constructor(server: Server) {
    this.server = server;
  }

  // This method is where subclasses should register to receive the network messages they are interested in.
  public registerNetworkHandlers(): void {
    // Override this method in subclasses.
  }

  // This method is where subclasses should unregister to stop receiving the network messages they are interested in.
  public unregisterNetworkHandlers(): void {
    // Override this method in subclasses.
  }

  public onStartRecruitmentPhase(): void {
    // Override this method in subclasses.
  }

  public onEndRecruitmentPhase(): void {
    // Override this method in subclasses.
  }

  public onStartManeuverPhase(): void {
    // Override this method in subclasses.
  }

  public onEndManeuverPhase(): void {
    // Override this method in subclasses.
  }

  public onStartSkirmishPhase(): void {
    // Override this method in subclasses.
  }

  public onEndSkirmishPhase(): void {
    // Override this method in subclasses.
  }

  public onStartBattlePhase(): void {
    // Override this method in subclasses.
  }

  public onEndBattlePhase(): void {
    // Override this method in subclasses.
  }
}

export default ServerHandler;
