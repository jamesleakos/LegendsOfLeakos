import React from 'react';
// internal
// components
import Hexmap from './Hexmap.jsx';
// css
import { RealmMapStyled } from './styles/RealmMap.styled.js';

const RealmMap = ({ tiles, onClick, hover }) => {
  return (
    <RealmMapStyled className='realm-map'>
      {!tiles || !tiles.length ? (
        <div>NO TILES FOUND</div>
      ) : (
        <Hexmap tiles={tiles} onClick={onClick} hover={hover} />
      )}
    </RealmMapStyled>
  );
};

export default RealmMap;
