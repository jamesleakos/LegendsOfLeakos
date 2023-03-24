// external
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// internal
// css
import { PlayPageStyled } from './styles/PlayPage.styled.js';
// components
import Navbar from '../Home/Navbar.jsx';
import RealmSelection from './Realms/RealmSelection.jsx';
import RoomSelection from './Rooms/RoomSelection.jsx';
// context
import SocketContext from '../../../contexts/SocketContext.js';

function PlayPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // socket
  const { socket } = useContext(SocketContext);

  // UI states
  const [selectionState, setSelectionState] = useState('realm');

  // realm and room selection - we've pulled it up one level so that we don't have a delay when switching between realms and rooms - if it needed to be even faster, we could move it to context

  //#region REALM SELECTION

  //#endregion

  //#region ROOM SELECTION and GAME START

  const [rooms, setRooms] = useState([]);
  const [myRoomID, setMyRoomID] = useState(null);

  useEffect(() => {
    if (!socket) return;

    // subscribe to socket events
    socket.on('rooms-update', (data) => {
      setRooms(data);
    });

    socket.on('you-joined-room', (room_id) => {
      setMyRoomID(room_id);
    });

    socket.on('you-left-room', (room_id) => {
      setMyRoomID(null);
    });

    socket.on('game-started', (room_id) => {
      setGameStarted(true);
    });

    // on load and socket request the rooms
    socket.emit('request-rooms');

    return () => {
      // have to leave everything here, otherwise the socket events will be subscribed to multiple times
      socket.off('rooms-update');
      socket.off('you-joined-room');
      socket.off('you-left-room');
      socket.off('game-started');

      // leave the room if we're in one
      leaveRoom();
    };
  }, [socket]);

  const requestNewRoom = () => {
    if (!socket) return;
    socket.emit('request-new-room');
  };

  const joinRoom = (room_id) => {
    socket.emit('request-join-room', {
      room_id,
    });
  };

  const leaveRoom = () => {
    socket.emit('request-leave-room');
  };

  const startGame = () => {
    socket.emit('request-start-game');
  };
  //#endregion

  return (
    <PlayPageStyled>
      <Navbar />
      {selectionState === 'realm' ? (
        <RealmSelection />
      ) : (
        <div
          className='section-selector'
          onClick={() => setSelectionState('realm')}
        >
          Choose Realm
        </div>
      )}
      {selectionState === 'room' ? (
        <RoomSelection rooms={rooms} requestNewRoom={requestNewRoom} />
      ) : (
        <div
          className='section-selector'
          onClick={() => setSelectionState('room')}
        >
          Choose Room
        </div>
      )}
    </PlayPageStyled>
  );
}

export default PlayPage;
