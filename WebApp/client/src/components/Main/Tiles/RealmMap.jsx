import React from 'react';
// internal
// components
import Hexmap from './Hexmap.jsx';
// css
import { RealmMapStyled } from './styles/RealmMap.styled.js';

const RealmMap = ({ tiles }) => {
  return (
    <RealmMapStyled className='realm-map'>
      {!!tiles.length && tiles.length > 0 ? (
        <Hexmap tiles={tiles} />
      ) : (
        <div>NO TILES FOUND</div>
      )}
    </RealmMapStyled>
  );
};

export default RealmMap;
