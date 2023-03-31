// external
import React, { useState, useEffect, useRef } from 'react';
const {
  Constants: {
    imageMapping: { landTypes },
  },
  Enums,
} = require('legends-of-leakos');
// internal
// css
import { HexmapStyled } from './styles/Hexmap.styled.js';

const Hexagon = ({ x, y, size }) => {
  const hexPoints = [
    { x: x + (size * Math.sqrt(3)) / 2, y: y },
    { x: x + size * Math.sqrt(3), y: y + size / 2 },
    { x: x + size * Math.sqrt(3), y: y + (size * 3) / 2 },
    { x: x + (size * Math.sqrt(3)) / 2, y: y + 2 * size },
    { x: x, y: y + (size * 3) / 2 },
    { x: x, y: y + size / 2 },
  ];
  const points = hexPoints.map((p) => `${p.x},${p.y}`).join(' ');
  return <polygon className='hexagon' points={points} />;
};

function Hexmap({ tiles }) {
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
            const typeString = Enums.LandType[tileType];
            const depth = tiles[index].depth;
            const depthString = Enums.BiomeDepth[depth];
            console.log('depth:', depth);
            console.log('depthString:', depthString);

            // default red hex
            let url =
              'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/red_hex.png';

            const typeObj = landTypes[typeString];
            console.log(typeObj);
            console.log(depthString);
            if (typeObj[depthString].length > 0) {
              // choose random string from array
              const randomIndex = Math.floor(
                Math.random() * typeObj[depthString].length
              );
              url = typeObj[depthString][randomIndex];
            } else {
              const randomIndex = Math.floor(
                Math.random() * typeObj.all.length
              );
              url = typeObj.all[randomIndex];
            }

            return (
              <div>
                <div
                  style={{
                    position: 'absolute',
                    left: x + hexagonSize / 2,
                    top: y + hexagonSize / 2,
                    color: 'red',
                    zIndex: 10,
                    fontSize: '1rem',
                  }}
                >
                  {/* {!!tiles && tiles[index] ? tiles[index].landType : ''} */}
                </div>
                <img
                  src={url}
                  style={{
                    position: 'absolute',
                    left: x,
                    top: y - (3 * hexagonSize) / 3,
                    zIndex: 9,
                    width: hexagonSize * Math.sqrt(3),
                    height: 3 * hexagonSize,
                  }}
                ></img>
                <svg
                  key={`${rowIndex}-${colIndex}`}
                  className='hexagon-svg'
                  width={hexagonSize * Math.sqrt(3)}
                  height={2 * hexagonSize}
                  style={{
                    position: 'absolute',
                    left: x,
                    top: y,
                  }}
                >
                  <Hexagon x={0} y={0} size={hexagonSize} />
                </svg>
              </div>
            );
          });
        })}
      </div>
    </HexmapStyled>
  );
}

export default Hexmap;
