import React, { useState, useEffect } from 'react';
// internal
import { RealmTileStyled } from './styles/RealmTile.styled';
import RealmMap from '../../../Tiles/RealmMap.jsx';

function RealmTile({ realm, selectRealm, selected }) {
  const title = realm.name;
  // TODO - relace with a Realm class function
  const [tiles, setTiles] = useState([]);
  useEffect(() => {
    const tempTiles = [];
    realm.biomes.forEach((biome) => {
      biome.terrain.landTiles.forEach((tile) => {
        tempTiles.push(tile);
      });
    });
    // sort tiles by id in ascending order
    tempTiles.sort((a, b) => a.id - b.id);
    setTiles(tempTiles);
  }, []);

  return (
    <RealmTileStyled>
      <div className={`interior-border ${selected ? ' selected' : ''}`}></div>
      <div className='title'>{title}</div>
      <div className='background'>
        <RealmMap className='realm-map' tiles={tiles} />
      </div>
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
