import React, { useState, useEffect } from 'react';
// internal
import { RealmTileStyled } from './styles/RealmTile.styled.js';
import RealmMap from '../Tiles/RealmMap.jsx';

function RealmTile({ realm, isSelected, setSelectedRealm }) {
  // TODO - relace with a Realm class function
  const [tiles, setTiles] = useState([]);
  useEffect(() => {
    const tempTiles = [];
    realm.biomes.forEach((biome) => {
      biome.landTiles.forEach((tile) => {
        tempTiles.push(tile);
      });
    });
    // sort tiles by id in ascending order
    tempTiles.sort((a, b) => a.id - b.id);
    setTiles(tempTiles);
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
    </RealmTileStyled>
  );
}

export default RealmTile;
