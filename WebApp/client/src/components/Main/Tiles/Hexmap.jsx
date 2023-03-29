// external
import React, { useState, useEffect, useRef } from 'react';
const {
  Constants: { landTypes },
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

            // const url = landTypes.find(
            //   (lt) => lt.type === tiles[index].landType
            // ).image;

            const url =
              'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/hexagon_fzbL_Cz-O.png?updatedAt=1680076686687';

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
                  {!!tiles && tiles[index] ? tiles[index].landType : ''}
                </div>
                <img
                  src={url}
                  style={{
                    position: 'absolute',
                    left: x,
                    top: y,
                    zIndex: 9,
                    width: hexagonSize * Math.sqrt(3),
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
