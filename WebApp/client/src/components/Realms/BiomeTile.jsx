// external
import React from 'react';
import { Enums } from 'legends-of-leakos';
const LandType = Enums.LandType;

// internal
// components
import RealmMap from '../Tiles/RealmMap.jsx';
//css
import { BiomeTileStyled } from './styles/BiomeTile.styled.js';

const formatImageLink = (link) => {
  return `linear-gradient( rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) ), url('${link}')`;
};

function BiomeTile({ biome, isSelected, setSelectedBiome, mouseOverBiome }) {
  const landType = biome.getLandTiles()[0].landType;
  const url = `https://ik.imagekit.io/hfywj4j0a/LoL/BiomeTileBackgrounds/${LandType[landType]}.png`;

  return (
    <BiomeTileStyled
      style={{
        backgroundImage: formatImageLink(url),
      }}
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
    </BiomeTileStyled>
  );
}

export default BiomeTile;
