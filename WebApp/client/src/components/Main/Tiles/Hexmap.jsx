// external
import React, { useState, useEffect, useRef } from 'react';
const {
  Constants: {
    imageMapping: {
      landTypes: { intsToUrl },
    },
  },
} = require('legends-of-leakos');
// internal
import Tile from './Tile.jsx';
// css
import { HexmapStyled } from './styles/Hexmap.styled.js';

function Hexmap({ tiles, onClick }) {
  const rows = [7, 10, 11, 12, 11, 12, 11, 10, 7];
  const [availableHeight, setAvailableHeight] = useState(0);
  const [availableWidth, setAvailableWidth] = useState(0);
  const hexmapRef = useRef(null);
  const [hexagonSize, setHexagonSize] = useState(0);

  useEffect(() => {
    const handleResizeWindow = () => {
      const hexmap = hexmapRef.current;
      setAvailableHeight(hexmap.clientHeight);
      setAvailableWidth(hexmap.clientWidth);
    };

    window.addEventListener('resize', handleResizeWindow);
    handleResizeWindow();
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  useEffect(() => {
    // hexagon size is 1/2 of the row height
    const sizeImpliedByHeight = ((availableHeight / rows.length) * 2) / 3;
    // hexagon size is 1/sqrt(3) of the hexagon width
    const sizeImpliedByWidth =
      availableWidth / Math.max(...rows) / Math.sqrt(3);

    setHexagonSize(Math.min(sizeImpliedByHeight, sizeImpliedByWidth));
  }, [availableHeight, availableWidth]);

  return (
    <HexmapStyled ref={hexmapRef}>
      <div className='hex-area'>
        {rows.map((rowLength, rowIndex) => {
          const rowIndices = rows.slice(0, rowIndex).reduce((a, b) => a + b, 0);
          const yOffset = rowIndex * hexagonSize * 1.5;
          const xOffset =
            ((Math.max(...rows) - rowLength) * hexagonSize * Math.sqrt(3)) / 2;

          return Array.from({ length: rowLength }).map((_, colIndex) => {
            const index = rowIndices + colIndex;
            const x = xOffset + colIndex * Math.sqrt(3) * hexagonSize;
            const y = yOffset;

            const tileType = tiles[index].landType;
            const depth = tiles[index].depth;

            let url = intsToUrl(tileType, depth);

            return (
              <Tile
                key={`${rowIndex}-${colIndex}`}
                id={index}
                x={x}
                y={y}
                hexagonSize={hexagonSize}
                rowIndex={rowIndex}
                colIndex={colIndex}
                url={url}
                onClick={onClick}
              />
            );
          });
        })}
      </div>
    </HexmapStyled>
  );
}

export default Hexmap;
