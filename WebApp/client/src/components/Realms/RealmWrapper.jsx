// external
import React, { useEffect, useState } from 'react';

// internal
// components
import RealmMap from '../Tiles/RealmMap.jsx';
//css
import { RealmWrapperStyled } from './SelectRealmScreen/styles/SelectRealmScreen.styled.js';

function RealmWrapper({ realm }) {
  const [tiles, setTiles] = useState([]);
  useEffect(() => {
    if (!realm) return;
    // TODO: this should be replaced by a Realm class function
    const tempTiles = [];
    realm.biomes.forEach((biome) => {
      biome.terrain.landTiles.forEach((tile) => {
        tempTiles.push(tile);
      });
    });
    // sort tiles by id in ascending order
    tempTiles.sort((a, b) => a.id - b.id);
    setTiles(tempTiles);
  }, [realm]);

  return (
    <RealmWrapperStyled>
      <RealmMap
        tiles={tiles}
        onClick={(id) => {
          console.log(`tile with id ${id} clicked`);
        }}
      />
    </RealmWrapperStyled>
  );
}

export default RealmWrapper;
