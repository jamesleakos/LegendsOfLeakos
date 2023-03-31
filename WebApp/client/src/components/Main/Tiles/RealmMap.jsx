import React from 'react';
// internal
// components
import Hexmap from './Hexmap.jsx';
// css
import { RealmMapStyled } from './styles/RealmMap.styled.js';

const RealmMap = ({ tiles, onClick }) => {
  return (
    <RealmMapStyled className='realm-map'>
      {!tiles || !tiles.length ? (
        <div>NO TILES FOUND</div>
      ) : (
        <Hexmap tiles={tiles} onClick={onClick} />
      )}
    </RealmMapStyled>
  );
};

export default RealmMap;
