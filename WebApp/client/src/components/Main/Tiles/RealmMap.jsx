import React from 'react';
// internal
// components
import Hexmap from './Hexmap.jsx';
// css
import { RealmMapStyled } from './styles/RealmMap.styled.js';

const RealmMap = ({ tiles }) => {
  return (
    <RealmMapStyled className='realm-map'>
      <Hexmap tiles={tiles} />
    </RealmMapStyled>
  );
};

export default RealmMap;
