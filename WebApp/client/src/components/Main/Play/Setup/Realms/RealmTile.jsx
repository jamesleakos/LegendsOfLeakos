import React from 'react';
// internal
import { RealmTileStyled } from './styles/RealmTile.styled';

function RealmTile({ realm, selectRealm, selected }) {
  return (
    <RealmTileStyled
      onClick={() => {
        selectRealm(realm._id);
      }}
    >
      <div>{realm.name}</div>
      {selected ? <div className='selected'>Selected</div> : null}
    </RealmTileStyled>
  );
}

export default RealmTile;
