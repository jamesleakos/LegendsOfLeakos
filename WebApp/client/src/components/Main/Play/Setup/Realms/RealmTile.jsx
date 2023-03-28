import React from 'react';
// internal
import { RealmTileStyled } from './styles/RealmTile.styled';

function RealmTile({ realm, selectRealm, selected }) {
  // const title = realm.name.toUpperCase();
  const title = realm.name;
  return (
    <RealmTileStyled
    // onClick={() => {
    //   selectRealm(realm._id);
    // }}
    >
      <div className={`interior-border ${selected ? ' selected' : ''}`}></div>
      <div className='title'>{title}</div>
      <div
        className={`menu-button ${selected ? ' selected' : ''}`}
        onClick={() => {
          selectRealm(realm._id);
        }}
      >
        {selected ? 'Selected' : 'Select Realm'}
      </div>
    </RealmTileStyled>
  );
}

export default RealmTile;
