import React, { useState, useEffect } from 'react';
// internal
import { RealmTileStyled } from './styles/RealmTile.styled.js';
import RealmMap from '../Tiles/RealmMap.jsx';

function RealmTile({ realm, isSelected, setSelectedRealm }) {
  // TODO - relace with a Realm class function
  const [tiles, setTiles] = useState([]);
  useEffect(() => {
    if (!realm) return;
    setTiles(realm.getLandTiles());
  }, []);

  return (
    <RealmTileStyled
      onClick={() => {
        setSelectedRealm(realm);
      }}
    >
      <div className={`interior-border ${isSelected ? ' selected' : ''}`}></div>
      <div className='title'>{realm.name}</div>
      <div className='background'>
        <RealmMap tiles={tiles} />
      </div>
      <div className='delete-button'>X</div>
    </RealmTileStyled>
  );
}

export default RealmTile;
