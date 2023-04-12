// external
import React, { useEffect, useState } from 'react';

// internal
import LandTypeSelector from './LandTypeSelector.jsx';
// components
//css
import { LandTypeSelectorBarStyled } from './styles/LandTypeSelectorBar.styled.js';

function LandTypeSelectorBar({ landTypeSelected, setLandTypeSelected }) {
  const style = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr',
    columnGap: '3%',
  };
  const style2 = {
    position: 'absolute',
  };
  return (
    <LandTypeSelectorBarStyled
      className='selector-bar'
      style={{
        ...style,
      }}
    >
      <LandTypeSelector
        landType={0}
        setLandTypeSelected={setLandTypeSelected}
        selected={landTypeSelected === 0}
      />
      <LandTypeSelector
        landType={1}
        setLandTypeSelected={setLandTypeSelected}
        selected={landTypeSelected === 1}
      />
      <LandTypeSelector
        landType={2}
        setLandTypeSelected={setLandTypeSelected}
        selected={landTypeSelected === 2}
      />
      <LandTypeSelector
        landType={3}
        setLandTypeSelected={setLandTypeSelected}
        selected={landTypeSelected === 3}
      />
      <LandTypeSelector
        landType={4}
        setLandTypeSelected={setLandTypeSelected}
        selected={landTypeSelected === 4}
      />
      <LandTypeSelector
        landType={5}
        setLandTypeSelected={setLandTypeSelected}
        selected={landTypeSelected === 5}
      />
      <LandTypeSelector
        landType={6}
        setLandTypeSelected={setLandTypeSelected}
        selected={landTypeSelected === 6}
      />
    </LandTypeSelectorBarStyled>
  );
}

export default LandTypeSelectorBar;
