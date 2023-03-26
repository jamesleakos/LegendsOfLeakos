const {
  Constants: { gameSettings },
  GameServer,
} = require('legends-of-leakos');
const { getUserSelectedRealm } = require('../db/controllers/realm.js');

const startGame = async (room, io) => {
  // check for correct number of players
  if (
    room.players.length < gameSettings.minPlayers ||
    room.players.length > gameSettings.maxPlayers
  ) {
    console.log('ERROR: Invalid number of players');
    return;
  }
  // give each player a realm
  for (let player of room.players) {
    const realm = getUserSelectedRealm(player.user_id);
    if (!realm) {
      console.log('ERROR: player does not have a realm');
      return;
    }
    player.realm = realm;
  }

  const clients = io.sockets.adapter.rooms.get(room.id);
  const sockets = [...clients].map((socket_id) =>
    io.sockets.sockets.get(socket_id)
  );

  room.game = new GameServer(
    room,
    // send to room callback
    (messageType, data) => {
      sendToRoom(messageType, room.id, data, io);
    },
    // send to player callback
    (messageType, data, playerSocketID) => {
      sendToPlayer(messageType, data, playerSocketID, io);
    },
    // end game callback
    (gameSummaryData) => {
      endGame(room, io, gameSummaryData, sockets);
    }
  );
  room.game.listen(sockets);
  room.game.startNewGame();
  room.gameInProgress = true;

  io.to(room.id).emit('game-started', room.id);
};

const sendToRoom = (messageType, room_id, data, io) => {
  io.to(room_id).emit(messageType, data);
};

const sendToPlayer = (messageType, data, playerSocketID, io) => {
  const client = io.sockets.sockets.get(playerSocketID);
  if (client) client.emit(messageType, data);
};

const endGame = (room, io, gameSummaryData, sockets) => {
  room.game.unlisten(sockets);
  room.gameInProgress = false;
  room.game = null;
  console.log(
    'save summary data to DB, update player stats, report to player, etc.: ',
    gameSummaryData
  );
  for (let player of room.players) {
    player.isReady = false;
  }
  io.to(room.id).emit('game-ended');
};

module.exports.startGame = startGame;
