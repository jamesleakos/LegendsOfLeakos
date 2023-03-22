// internal
const roomMan = require('../managers/roomManager.js');
const gameMan = require('../managers/gameManager.js');
const userController = require('../db/controllers/user.js');

module.exports = async (io, playerSocket) => {
  // on connection, create a user and add them to the room manager
  const user_id = playerSocket?.request?.session?.passport?.user;
  const user = await userController.getUserById(user_id);

  // first check if the user is already in the system - if so, replace their socket

  // here we could check if the user is already in a game, and if so, send them to the game

  const createNewRoom = async (data) => {
    // get user from socket message data

    // get realm from db and data

    // create player
    const player = roomMan.createPlayer(user, playerSocket, realm);

    // create room and add player
    const room = await roomMan.createNewRoomAddPlayer(
      data.roomname,
      data.username,
      data.realmID,
      playerSocket,
      io
    );

    playerSocket.emit('you-joined-room', room.id);
    io.emit('rooms-update', roomMan.getOpenRooms());
  };

  const joinRoom = async (data) => {
    const room = roomMan.getRoomByID(data.room_id);

    // create player and add to room
    await roomMan.addPlayerToRoom(
      room,
      data.username,
      data.realmID,
      playerSocket
    );

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

  const playerDisconnected = () => {
    roomMan.playerDisconnected(playerSocket);
  };

  // on join, this will be sent
  io.emit('rooms-update', roomMan.getOpenRooms());

  // and these will be assigned
  playerSocket.on('request-new-room', async () => await createNewRoom());
  playerSocket.on('request-join-room', async () => await joinRoom());
  playerSocket.on('request-leave-room', leaveRoom);
  playerSocket.on('request-start-game', startGame);
  playerSocket.on('disconnect', playerDisconnected);
};
