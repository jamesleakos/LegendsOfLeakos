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
    this.userIDToRoom = {};
    this.userIDToPlayer = {};
    this.socketIDToPlayer = {};
  }

  getFullRoomReport() {
    return {
      rooms: this.rooms,
      players: this.players,
      userIDToRoom: this.socketIDToRoom,
      userIDToPlayer: this.userIDToPlayer,
      socketIDToPlayer: this.socketIDToPlayer,
    };
  }

  getRoomByID(roomID) {
    return this.rooms.find((r) => r.id === roomID);
  }

  getOpenRooms() {
    const outRooms = this.rooms.filter((room) => {
      return !room.gameInProgress && !room.game;
    });

    return outRooms;
  }

  createRoom(roomname) {
    // make sure to cleanup
    this.cleanupEmptyRooms();

    const newRoom = new Room(roomname);
    this.rooms.push(newRoom);
    return newRoom;
  }

  getPlayerByUserID(userID) {
    return this.userIDToPlayer[userID];
  }

  getPlayerBySocketID(socketID) {
    return this.socketIDToPlayer[socketID];
  }

  createPlayer(user, playerSocket, realm = null) {
    const newPlayer = new LoLPlayer(
      playerSocket.id,
      user.id,
      user.name.slice(0, 10),
      realm
    );
    this.players.push(newPlayer);
    this.socketIDToPlayer[playerSocket.id] = newPlayer;
    this.userIDToPlayer[user.id] = newPlayer;
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

    // add to io namespace
    playerSocket.join(room.id);

    // add to new room
    room.addPlayer(player);

    this.userIDToRoom[player.user_id] = room;

    // remove player from any other rooms they're in
    const otherRooms = this.rooms.filter((r) => r.id !== room.id);
    otherRooms.forEach((r) => {
      this.removePlayerFromRoom(r, player, playerSocket);
    });
  }

  removePlayerFromRoom(room, player, playerSocket) {
    // remove from room
    room.removePlayer(player.user_id);
    // remove from playerToRoom tracker
    delete this.userIDToRoom[player.user_id];
    //unsub from room messages
    playerSocket.leave(room.id);

    // make sure to cleanup
    this.cleanupEmptyRooms();
  }

  removePlayerFromTrackedRoom(player, playerSocket) {
    const oldRoom = this.userIDToRoom[player.user_id];
    if (oldRoom) this.removePlayerFromRoom(oldRoom, player, playerSocket);
  }

  playerConnected(user, playerSocket) {
    console.log(
      'playerConnected with socket_id',
      playerSocket.id,
      'and user_id',
      user.id
    );
    console.log(this.userIDToPlayer);
    let needsToJoinGame = false;
    const player = this.userIDToPlayer[user.id];
    if (player) {
      console.log('found player');
      // update the player with the new socket
      player.socket_id = playerSocket.id;

      console.log(this.rooms);

      // update the socketIDToPlayer tracker
      this.socketIDToPlayer[playerSocket.id] = player;

      const room = this.userIDToRoom[user.id];
      if (room && room.game && room.gameInProgress) {
        // the player had been disconnected, but not removed and the game is still on

        // subscribe the player to the room and game they were in
        playerSocket.join(room.id);

        needsToJoinGame = true;
        return needsToJoinGame;
      }
      return needsToJoinGame;
    } else {
      // the player is new, create them
      this.createPlayer(user, playerSocket);
      return needsToJoinGame;
    }
  }

  playerDisconnected(playerSocket) {
    const player = this.socketIDToPlayer[playerSocket.id];
    const room = this.userIDToRoom[player.user_id];
    if (room && room.game && room.gameInProgress) {
      // set to disconnected but don't remove
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

    const player = this.socketIDToPlayer[playerSocket.id];
    if (player) {
      const user_id = player.user_id;
      // delete from userID tracker
      delete this.userIDToPlayer[user_id];
      delete this.userIDToRoom[user_id];
    }

    // remove from array - this auto removes it from the trackers as well?
    this.players = this.players.filter((p) => p.socket_id !== playerSocket.id);

    // delete from trackers
    delete this.socketIDToPlayer[playerSocket.id];
  }

  cleanupEmptyRooms() {
    this.rooms = this.rooms.filter((r) => r.players.length > 0);
  }
}

const roomMan = new RoomManager();
module.exports = roomMan;
