import React from 'react';

// components
import RealmScroller from './RealmScroller.jsx';
// css
import { RealmSelectionStyled } from './styles/RealmSelection.styled.js';

function RealmSelection() {
  return (
    <RealmSelectionStyled>
      <h3>Choose your Realm</h3>
      <RealmScroller />
    </RealmSelectionStyled>
  );
}

export default RealmSelection;
