// external
import React, { useEffect, useState, useRef, useMemo } from 'react';
// lol
import { Enums, Constants } from 'legends-of-leakos';
const { LandType } = Enums;
const intsToUrl = Constants.imageMapping.landTypes.intsToUrl;

// internal
import TileImage from '../Tiles/TileImage.jsx';
import TileHexagon from '../Tiles/TileHexagon.jsx';
// components
//css
import { LandTypeSelectorStyled } from './styles/LandTypeSelector.styled.js';

function LandTypeSelector({ landType, setLandTypeSelected, selected }) {
  const x = 0;
  const y = 0;
  const url = useMemo(() => intsToUrl(landType, 3), [landType]);

  const [availableHeight, setAvailableHeight] = useState(0);
  const [availableWidth, setAvailableWidth] = useState(0);
  const selectorRef = useRef(null);
  const [hexagonSize, setHexagonSize] = useState(0);

  //#region setting hexagonSize
  // setting availableHeight and availableWidth
  useEffect(() => {
    const handleResizeWindow = () => {
      const selector = selectorRef.current;
      setAvailableHeight(selector.clientHeight);
      setAvailableWidth(selector.clientWidth);
    };

    window.addEventListener('resize', handleResizeWindow);
    handleResizeWindow();
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  // setting hexagonSize based on changing availableHeight and availableWidth
  useEffect(() => {
    // hexagon size is 1/2 of the row height
    const sizeImpliedByHeight = (availableHeight * 2) / 3;
    // hexagon size is 1/sqrt(3) of the hexagon width
    const sizeImpliedByWidth = availableWidth / Math.sqrt(3);

    setHexagonSize(Math.min(sizeImpliedByHeight, sizeImpliedByWidth));
  }, [availableHeight, availableWidth]);

  //#endregion

  return (
    <LandTypeSelectorStyled
      className='land-type-selector'
      onClick={() => {
        setLandTypeSelected(landType);
      }}
      ref={selectorRef}
    >
      <div className={'visual' + (selected ? ' selected' : '')}>
        <TileImage x={x} y={y} hexagonSize={hexagonSize} url={url} />
        <TileHexagon
          x={x}
          y={y}
          hexagonSize={hexagonSize}
          borderAlwaysOn={true}
        />
      </div>
    </LandTypeSelectorStyled>
  );
}

export default LandTypeSelector;
