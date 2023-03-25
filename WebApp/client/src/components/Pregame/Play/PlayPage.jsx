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
  // navigate
  const navigate = useNavigate();

  // UI states
  const [selectionState, setSelectionState] = useState('realm');

  // realm and room selection - we've pulled it up one level so that we don't have a delay when switching between realms and rooms - if it needed to be even faster, we could move it to context

  //#region REALM SELECTION
  const [realms, setRealms] = useState([]);
  const [selectedRealmID, setSelectedRealmID] = useState(null);
  useEffect(() => {
    console.log('getting realms...');
    axios
      .get('/realms')
      .then((res) => {
        setRealms(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const selectRealm = (realm_id) => {
    setSelectedRealmID(realm_id);
    axios
      .patch('/realms/selected-realm', { realm_id })
      .then((res) => {
        setSelectedRealmID(realm_id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //#endregion

  //#region ROOM SELECTION and GAME START
  // socket
  const { socket } = useContext(SocketContext);

  const [rooms, setRooms] = useState([]);
  const [myRoomID, setMyRoomID] = useState(null);
  const [amReady, setAmReady] = useState(false);

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
      // navigate to the game page
    });

    socket.on('set-ready', (data) => {
      setAmReady(data);
    });

    socket.on('server-message', (data) => {
      console.log('server message', data);
    });

    socket.on('game-ended', (data) => {
      console.log('game ended');
    });

    // on load and socket request the rooms
    socket.emit('request-rooms');

    return () => {
      // have to leave everything here, otherwise the socket events will be subscribed to multiple times
      socket.off('rooms-update');
      socket.off('you-joined-room');
      socket.off('you-left-room');
      socket.off('game-started');
      socket.off('set-ready');
      socket.off('server-message');
      socket.off('game-ended');
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

  const setReady = () => {
    socket.emit('request-toggle-ready');
  };

  const test = () => {
    socket.emit('client-message');
  };
  const endGame = () => {
    socket.emit('end-game');
  };
  //#endregion

  return (
    <PlayPageStyled>
      <Navbar />
      {selectionState === 'realm' ? (
        <RealmSelection
          realms={realms}
          selectRealm={selectRealm}
          selectedRealmID={selectedRealmID}
        />
      ) : (
        <div
          className='section-selector'
          onClick={() => setSelectionState('realm')}
        >
          Choose Realm
        </div>
      )}
      {selectionState === 'room' ? (
        <RoomSelection
          amReady={amReady}
          myRoomID={myRoomID}
          rooms={rooms}
          requestNewRoom={requestNewRoom}
          joinRoom={joinRoom}
          leaveRoom={leaveRoom}
          setReady={setReady}
        />
      ) : (
        <div
          className='section-selector'
          onClick={() => setSelectionState('room')}
        >
          Choose Room
        </div>
      )}
      <button onClick={test}>test</button>
      <button onClick={endGame}>endGame</button>
    </PlayPageStyled>
  );
}

export default PlayPage;
