// external
import React, { useEffect, useState } from 'react';
import { Enums } from 'legends-of-leakos';
const LandType = Enums.LandType;

// internal
// components
import BiomeTile from './BiomeTile.jsx';
//css
import { BiomeListStyled } from './styles/BiomeList.styled.js';

function BiomeList({
  biomes,
  selectedBiome,
  setSelectedBiome,
  mouseOverBiome,
}) {
  return (
    <BiomeListStyled>
      <div className='underlined-title'>Biomes</div>
      <div className='biometile-holder'>
        {biomes
          .filter((biome) => {
            return biome.biomeType !== LandType.city;
          })
          .map((biome, index) => {
            // to prevent key conflicts
            const biomeID =
              biome.biomeType +
              index +
              biome.landTiles.map((tile) => tile.id).join('-');
            return (
              <BiomeTile
                key={biomeID}
                biome={biome}
                isSelected={biome === selectedBiome}
                setSelectedBiome={setSelectedBiome}
                mouseOverBiome={mouseOverBiome}
              />
            );
          })}
      </div>
    </BiomeListStyled>
  );
}

export default BiomeList;
