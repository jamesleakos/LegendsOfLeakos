import React, { useState, useEffect, useContext } from 'react';

// internal
// css
import { RoomSelectionStyled } from './styles/RoomSelection.styled.js';

function RoomSelection({ rooms, requestNewRoom }) {
  return (
    <RoomSelectionStyled>
      <div>
        <h3>Select a Room</h3>
        <button onClick={requestNewRoom}>Create New Room</button>
        {rooms.map((room) => {
          return (
            <div key={room.id}>
              <div>{room.name}</div>
              <div>{room.players.length}</div>
            </div>
          );
        })}
      </div>
    </RoomSelectionStyled>
  );
}

export default RoomSelection;
