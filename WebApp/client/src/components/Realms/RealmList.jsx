// external
import React, { useEffect, useState } from 'react';

// internal
// components
import RealmTile from './RealmTile.jsx';
//css
import { RealmListStyled } from './styles/RealmList.styled.js';

function RealmList({ realms, selectedRealm, setSelectedRealm, deleteRealm }) {
  return (
    <RealmListStyled>
      <div className='underlined-title'>Realms</div>
      <div className='realmtile-holder'>
        {realms.map((realm) => {
          return (
            <RealmTile
              key={realm._id}
              realm={realm}
              isSelected={realm._id === selectedRealm._id}
              setSelectedRealm={setSelectedRealm}
              deleteRealm={deleteRealm}
            />
          );
        })}
      </div>
    </RealmListStyled>
  );
}

export default RealmList;
