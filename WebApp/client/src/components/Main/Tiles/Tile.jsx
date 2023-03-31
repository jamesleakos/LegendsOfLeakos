// external
import React, { useState, useEffect, useRef } from 'react';
// internal
import TileText from './TileText.jsx';
import TileImage from './TileImage.jsx';
import TileHexagon from './TileHexagon.jsx';

// css
import { TileStyled } from './styles/Tile.styled.js';

function Tile({ x, y, hexagonSize, rowIndex, colIndex, url }) {
  return (
    <TileStyled>
      {/* if we need to add any text, this is it */}
      {/* <TileText x={x} y={y} hexagonSize={hexagonSize} text={'test'} /> */}
      <TileHexagon x={x} y={y} hexagonSize={hexagonSize} />
      <TileImage x={x} y={y} hexagonSize={hexagonSize} url={url} />
    </TileStyled>
  );
}

export default Tile;
