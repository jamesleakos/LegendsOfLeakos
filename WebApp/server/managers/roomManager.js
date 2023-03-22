const { v4: uuidv4 } = require('uuid');

class LoLPlayer {
  constructor(socket_id, user_id, name, realm) {
    this.socket_id = socket_id;
    this.user_id = user_id;
    this.name = name;
    this.realm = realm;
    this.isConnected = true;
  }
}

class Room {
  constructor(name) {
    this.id = uuidv4();
    this.name = name;
    this.players = [];
    this.gameInProgress = false;
    this.game = null;
  }

  addPlayer(player) {
    if (this.players.find((p) => p.user_id === player.user_id)) return;

    this.players.push(player);
  }

  removePlayer(user_id) {
    this.players = this.players.filter((p) => p.user_id !== user_id);
  }
}

class RoomManager {
  constructor() {
    this.rooms = [];
    this.players = [];
    this.socketIDToRoom = {};
    this.userIDToPlayer = {};
    this.socketIDToPlayer = {};
  }

  getFullRoomReport() {
    return {
      rooms: this.rooms,
      players: this.players,
      socketIDToRoom: this.socketIDToRoom,
      userIDToPlayer: this.userIDToPlayer,
      socketIDToPlayer: this.socketIDToPlayer,
    };
  }

  getRoomByID(roomID) {
    return this.rooms.find((r) => r.id === roomID);
  }

  getOpenRooms() {
    return this.rooms.filter((room) => {
      return !room.started && !room.game;
    });
  }

  createRoom(roomname) {
    // make sure to cleanup
    this.cleanupEmptyRooms();

    const newRoom = new Room(roomname);
    this.rooms.push(newRoom);
    return newRoom;
  }

  getPlayerBySocketID(socketID) {
    return this.socketIDToPlayer[socketID];
  }

  createPlayer(user, playerSocket, realm = null) {
    const newPlayer = new LoLPlayer(
      playerSocket.id,
      user._id,
      user.name.slice(0, 10),
      realm
    );
    this.players.push(newPlayer);
    this.socketIDToPlayer[playerSocket.id] = newPlayer;
    this.userIDToPlayer[user._id] = newPlayer;
    return newPlayer;
  }

  // new room on player request, player gets added
  createNewRoomAddPlayer(roomname, player, playerSocket) {
    // create room
    const room = this.createRoom(roomname);
    this.addPlayerToRoom(room, player, playerSocket);
    return room;
  }

  addPlayerToRoom(room, player, playerSocket) {
    // don't let a player join a room they're already in
    if (room.players.find((p) => p.user_id === player.user_id)) return;

    // remove from an old rooms they might be in
    this.removePlayerFromTrackedRoom(player);

    // add to io namespace
    playerSocket.join(room.id);

    // add to new room
    room.addPlayer(player);

    this.socketIDToRoom[playerSocket.id] = room;
  }

  removePlayerFromRoom(room, playerSocket) {
    // remove from room
    room.removePlayer(playerSocket.id);
    // remove from playerToRoom tracker
    delete this.socketIDToRoom[playerSocket.id];
    //unsub from room messages
    playerSocket.leave(room.id);

    // make sure to cleanup
    this.cleanupEmptyRooms();
  }

  removePlayerFromTrackedRoom(playerSocket) {
    const oldRoom = this.socketIDToRoom[playerSocket.id];
    if (oldRoom) this.removePlayerFromRoom(oldRoom, playerSocket);
  }

  playerConnected(user, playerSocket) {
    let needsToJoinGame = false;
    const player = this.userIDToPlayer[user._id];
    const room = this.socketIDToRoom[player.socket_id];
    if (player && room && room.game && room.gameInProgress) {
      // the player had been disconnected, but not removed and the game is still on

      // update the player with the new socket
      player.socket_id = playerSocket.id;

      // update the socketIDToPlayer tracker
      this.socketIDToPlayer[playerSocket.id] = player;

      // subscribe the player to the room and game they were in
      // add to io namespace
      playerSocket.join(room.id);

      needsToJoinGame = true;
      return needsToJoinGame;
    } else if (player) {
      // they were here but not in a game so just remove them and start over
      this.removePlayer(playerSocket);
      this.createPlayer(user, playerSocket);
      return needsToJoinGame;
    } else {
      // the player is new, create them
      this.createPlayer(user, playerSocket);
      return needsToJoinGame;
    }
  }

  playerDisconnected(playerSocket) {
    const room = this.socketIDToRoom[playerSocket.id];
    if (room && room.game && room.gameInProgress) {
      // set to disconnected but don't remove
      const player = this.socketIDToPlayer[playerSocket.id];
      player.isConnected = false;
    } else {
      // remove from all
      this.removePlayer(playerSocket);
    }

    // TODO: we need to handle disconnections that never come back. Otherwise their game sticks around, and their room, and this player, and never gets cleaned up
  }

  removePlayer(playerSocket) {
    // remove from room
    this.removePlayerFromTrackedRoom(playerSocket);

    // remove from array
    this.players = this.players.filter((p) => p.socket_id !== playerSocket.id);

    // delete from trackers
    delete this.socketIDToPlayer[playerSocket.id];
    delete this.socketIDToRoom[playerSocket.id];

    // delete from userID tracker
    const player = this.socketIDToPlayer[playerSocket.id];
    delete this.userIDToPlayer[player.user_id];
  }

  cleanupEmptyRooms() {
    this.rooms = this.rooms.filter((r) => r.players.length > 0);
  }
}

const roomMan = new RoomManager();
module.exports = roomMan;
