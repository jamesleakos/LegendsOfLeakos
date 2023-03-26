import React, { useState, useEffect, useContext } from 'react';

// internal
import RoomTile from './RoomTile.jsx';
// css
import { RoomSelectionStyled } from './styles/RoomSelection.styled.js';

function RoomSelection({ socket, setSelectionState }) {
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
      setSelectionState('game');
    });

    socket.on('set-ready', (data) => {
      setAmReady(data);
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

  return (
    <RoomSelectionStyled>
      <div>
        <div className='top-bar'>
          <h3>Select a Room</h3>
          <button onClick={requestNewRoom}>Create New Room</button>
          <button onClick={leaveRoom}>Leave Room</button>
          <button onClick={setReady}>
            {amReady ? 'Set Not Ready' : 'Set Ready'}
          </button>
        </div>

        {rooms.map((room) => {
          return <RoomTile key={room.id} room={room} joinRoom={joinRoom} />;
        })}
      </div>
    </RoomSelectionStyled>
  );
}

export default RoomSelection;
