// external
import React, { useEffect, useState } from 'react';

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
        {biomes.map((biome, index) => {
          return (
            <BiomeTile
              key={biome.biomeType + index + ''}
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
