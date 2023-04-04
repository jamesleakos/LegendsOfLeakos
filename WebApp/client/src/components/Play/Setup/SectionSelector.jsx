import React from 'react';
import { SectionSelectorStyled } from './styles/SectionSelector.styled';

function SectionSelector({ setSelectionState, title }) {
  return (
    <SectionSelectorStyled onClick={() => setSelectionState('realm')}>
      {title}
    </SectionSelectorStyled>
  );
}

export default SectionSelector;
