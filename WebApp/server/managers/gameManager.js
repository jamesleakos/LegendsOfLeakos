const {
  Constants: { gameSettings },
  GameServer,
} = require('legends-of-leakos');
console.log(gameSettings);
const Tracking = require('../db/controllers/tracking.js');

const startGame = async (room, io) => {
  // make sure the players in the room are valid
  // correct number of players
  if (
    room.players.length < gameSettings.minPlayers ||
    room.players.length > gameSettings.maxPlayers
  ) {
    console.log('ERROR: Invalid number of players');
    return;
  }
  // make sure each player has a realm
  for (let player of room.players) {
    if (!player.realm) {
      console.log('ERROR: Player has no realm');
      return;
    }
  }

  // track the game in the db
  Tracking.addGame(room.players.map((p) => p.name));

  const clients = io.sockets.adapter.rooms.get(room.id);
  const sockets = [...clients].map((id) => io.sockets.sockets.get(id));

  room.game = new GameServer(
    room,
    (messageType, data) => {
      sendToRoom(messageType, room.id, data, io);
    },
    (messageType, data, playerSocketID) => {
      sendToPlayer(messageType, data, playerSocketID, io);
    }
  );
  room.game.listen(sockets);
  room.game.startNewGame();
  room.started = true;

  io.to(room.id).emit('game-started', room.id);
};

const sendToRoom = (messageType, room_id, data, io) => {
  io.to(room_id).emit(messageType, data);
};

const sendToPlayer = (messageType, data, playerSocketID, io) => {
  const client = io.sockets.sockets.get(playerSocketID);
  if (client) client.emit(messageType, data);
};

module.exports.startGame = startGame;
