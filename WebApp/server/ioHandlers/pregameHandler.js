// internal
const roomMan = require('../managers/roomManager.js');
const gameMan = require('../managers/gameManager.js');
const userController = require('../db/controllers/user.js');
const realmController = require('../db/controllers/realm.js');

module.exports = async (io, playerSocket) => {
  // on connection, create a user and add them to the room manager
  const user_id = playerSocket?.request?.session?.passport?.user;
  const user = await userController.getUserById(user_id);
  let needsToJoinGame = roomMan.playerConnected(user, playerSocket);
  if (needsToJoinGame) {
    // TODO - implement this later
    // pretty much just need to run them through the game subscription process and then let the client know that they're in the game
  }

  const createNewRoom = async (data) => {
    const player = roomMan.getPlayerBySocketID(playerSocket.id);
    if (!player) {
      console.log('ERROR: player not found');
      return;
    }

    // create room and add player
    const room = roomMan.createNewRoomAddPlayer(
      data.roomname,
      player,
      playerSocket
    );

    playerSocket.emit('you-joined-room', room.id);
    io.emit('rooms-update', roomMan.getOpenRooms());
  };

  const joinRoom = async (data) => {
    const room = roomMan.getRoomByID(data.room_id);

    // create player and add to room
    roomMan.addPlayerToRoom(room, data.username, data.realmID, playerSocket);

    playerSocket.emit('you-joined-room', room.id);
    io.emit('rooms-update', roomMan.getOpenRooms());
  };

  const leaveRoom = () => {
    roomMan.removePlayerFromTrackedRoom(playerSocket);

    playerSocket.emit('you-left-room');
    io.emit('rooms-update', roomMan.getOpenRooms());
  };

  const startGame = (data) => {
    const room = roomMan.getRoomByID(data.room_id);
    // make sure this is a player actually in the room!
    if (!room.players.find((p) => p.id === playerSocket.id)) return;

    gameMan.startGame(room, io);

    io.emit('rooms-update', roomMan.getOpenRooms());
  };

  const updateRealm = (data) => {
    const player = roomMan.getPlayerBySocketID(playerSocket.id);
    if (!player) {
      console.log('ERROR: player not found');
      return;
    }

    // get realm from db
    const realm = realmController.getRealmById(data.realm_id);

    player.realm = realm;
    console.log('updated realm');
  };

  const playerDisconnected = () => {
    roomMan.playerDisconnected(playerSocket);
  };

  const fullRoomReport = () => {
    if (user.role !== 'admin') return;
    playerSocket.emit('full-room-report', roomMan.getFullRoomReport());
  };

  // on join, this will be sent
  io.emit('rooms-update', roomMan.getOpenRooms());

  // and these will be assigned
  playerSocket.on('request-new-room', createNewRoom);
  playerSocket.on('request-join-room', joinRoom);
  playerSocket.on('request-update-realm', updateRealm);
  playerSocket.on('request-leave-room', leaveRoom);
  playerSocket.on('request-start-game', startGame);
  playerSocket.on('request-full-room-report', fullRoomReport);
  playerSocket.on('disconnect', playerDisconnected);
};
