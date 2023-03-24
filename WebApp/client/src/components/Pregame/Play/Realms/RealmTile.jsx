import React from 'react';
// internal
import { RealmTileStyled } from './styles/RealmTile.styled';

function RealmTile({ realm }) {
  return (
    <RealmTileStyled>
      <div>{realm.name}</div>
    </RealmTileStyled>
  );
}

export default RealmTile;
