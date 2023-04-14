// external
import React, { useEffect, useState } from 'react';

// internal
// components
import RealmMap from '../Tiles/RealmMap.jsx';
//css
import { BiomeTileStyled } from './styles/BiomeTile.styled.js';

const tilesFromBiome = function (biome) {
  const landType = biome.landTiles[0].landType;
  const tempTiles = [];
  // TODO - this should come from a constant
  const realmSize = [7, 10, 11, 12, 11, 12, 11, 10, 7].reduce((a, b) => a + b);
  for (let i = 0; i < realmSize; i++) {
    tempTiles.push({ id: i, landType: landType, depth: 3 });
  }
  return tempTiles;
};

function BiomeTile({ biome, isSelected, setSelectedBiome, mouseOverBiome }) {
  const [tiles, setTiles] = useState(tilesFromBiome(biome));

  return (
    <BiomeTileStyled
      onClick={() => {
        setSelectedBiome(biome);
      }}
      onMouseEnter={() => {
        mouseOverBiome(biome);
      }}
      onMouseLeave={() => {
        mouseOverBiome(null);
      }}
    >
      <div className={`interior-border ${isSelected ? ' selected' : ''}`}></div>
      <div className='title'>{biome?.name}</div>
      <div className='background'>
        <RealmMap tiles={tiles} />
      </div>
    </BiomeTileStyled>
  );
}

export default BiomeTile;
