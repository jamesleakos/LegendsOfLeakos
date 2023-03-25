import React, { useState, useEffect, useContext } from 'react';

// internal
import RoomTile from './RoomTile.jsx';
// css
import { RoomSelectionStyled } from './styles/RoomSelection.styled.js';

function RoomSelection({
  amReady,
  myRoomID,
  rooms,
  requestNewRoom,
  joinRoom,
  leaveRoom,
  setReady,
}) {
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
