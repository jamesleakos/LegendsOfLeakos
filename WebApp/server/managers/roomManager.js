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
    this.socketIDToPlayer = {};
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

  createPlayer(user, playerSocket, realm = null) {
    const newPlayer = new LoLPlayer(
      playerSocket.id,
      user._id,
      user.name.slice(0, 10),
      realm
    );
    this.players.push(newPlayer);
    return newPlayer;
  }

  removePlayer(playerSocket) {
    this.players = this.players.filter((p) => p.socket_id !== playerSocket.id);
  }

  async addPlayerToRoom(room, player, playerSocket) {
    try {
      // TODO: get the realm from our db

      // don't let a player join a room they're already in
      if (room.players.find((p) => p.socket_id === playerSocket.id)) return;

      // remove from an old rooms they might be in
      this.removePlayerFromTrackedRoom(player);

      // add to io namespace
      playerSocket.join(room.id);

      // add to new room
      room.addPlayer(
        new LoLPlayer(playerSocket.id, user.id, user.name.slice(0, 10), realm)
      );

      this.socketIDToRoom[playerSocket.id] = room;
    } catch (err) {
      console.error(err);
    }
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

  cleanupEmptyRooms() {
    this.rooms = this.rooms.filter((r) => r.players.length > 0);
  }

  // new room on player request, player gets added
  async createNewRoomAddPlayer(roomname, player, playerSocket) {
    // create room
    const room = this.createRoom(roomname);
    await this.addPlayerToRoom(room, player, playerSocket);
    return room;
  }

  playerDisconnected(playerSocket) {}
}

const roomMan = new RoomManager();
module.exports = roomMan;
