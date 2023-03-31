import React from 'react';
// internal
import { RealmTileStyled } from './styles/RealmTile.styled';
import RealmMap from '../../../Tiles/RealmMap.jsx';

function RealmTile({ realm, selectRealm, selected }) {
  // TODO - relace with a Realm class function
  const title = realm.name;
  const tiles = [];
  realm.biomes.forEach((biome) => {
    biome.terrain.landTiles.forEach((tile) => {
      tiles.push(tile);
    });
  });
  // sort tiles by id in ascending order
  tiles.sort((a, b) => a.id - b.id);

  return (
    <RealmTileStyled>
      <div className={`interior-border ${selected ? ' selected' : ''}`}></div>
      <div className='title'>{title}</div>
      <div className='background'>
        <RealmMap tiles={tiles} />
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
