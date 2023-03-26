
import Constants from "./Constants";

class GameServer {
  room: any;
  sendToRoom: Function;
  sendToPlayer: Function;
  endGameCallback: Function;
  constructor(room:any, sendToRoom:Function, sendToPlayer:Function, endGameCallback:Function) {
    this.room = room;
    this.sendToRoom = sendToRoom;
    this.sendToPlayer = sendToPlayer;
    this.endGameCallback = endGameCallback;
  }
  startNewGame() {
    console.log("Starting new game");
  }
  endGame() {
    console.log("Ending game");
    this.endGameCallback('game statistics go here');
  }

  listen(playerSockets:any) {
    const game = this;
    for (let socket of playerSockets) {
      socket.on('client-message', function (data:any) {
        game.test(socket, data);
      });
      socket.on('end-game', function (data:any) {
        game.endGame();
      });
    }
  }
  unlisten(playerSockets:any) {
    for (let socket of playerSockets) {
      socket.removeAllListeners('client-message');
      socket.removeAllListeners('end-game');
    }
  }
  test(playerSocket:any, data:any) {
    console.log('GameServer: returning message');
    this.sendToRoom('server-message', 'Hello from server');
  }
}


module.exports = {
  Constants: Constants,
  GameServer: GameServer
}


