// external
import React, { useState, useEffect, useRef } from 'react';
// internal
import TileText from './TileText.jsx';
import TileImage from './TileImage.jsx';
import TileHexagon from './TileHexagon.jsx';

// css
import { TileStyled } from './styles/Tile.styled.js';

function Tile({ id, x, y, hexagonSize, url, onClick }) {
  return (
    <TileStyled
      // confusingly, pointer events are disabled for the parent, but enabled for the svg, but that triggers it here
      // we leave it like that though because the shape is correct like that. It works nicely, frankly
      onClick={() => {
        onClick(id);
      }}
    >
      {/* if we need to add any text, this is it */}
      {/* <TileText x={x} y={y} hexagonSize={hexagonSize} text={'test'} /> */}
      <TileImage x={x} y={y} hexagonSize={hexagonSize} url={url} />
      <TileHexagon x={x} y={y} hexagonSize={hexagonSize} />
    </TileStyled>
  );
}

export default Tile;
