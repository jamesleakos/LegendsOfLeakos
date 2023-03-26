import React, { useState, useEffect, useContext } from 'react';

// internal
// css
import { RoomTileStyled } from './styles/RoomTile.styled.js';

function RoomTile({ room, joinRoom }) {
  return (
    <RoomTileStyled
      onClick={() => {
        joinRoom(room.id);
      }}
    >
      <h3>{room.name}</h3>
      {room.players.map((player, index) => {
        return <div key={player.name + index + ''}>{player.name}</div>;
      })}
    </RoomTileStyled>
  );
}

export default RoomTile;
