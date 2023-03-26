import React from 'react';

// components
import RealmScroller from './RealmScroller.jsx';
// css
import { RealmSelectionStyled } from './styles/RealmSelection.styled.js';

function RealmSelection({ realms, selectRealm, selectedRealmID }) {
  return (
    <RealmSelectionStyled>
      <h3>Choose your Realm</h3>
      <RealmScroller
        realms={realms}
        selectRealm={selectRealm}
        selectedRealmID={selectedRealmID}
      />
    </RealmSelectionStyled>
  );
}

export default RealmSelection;
