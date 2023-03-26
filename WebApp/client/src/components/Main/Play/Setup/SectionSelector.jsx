import React from 'react';

function SectionSelector({ setSelectionState, title }) {
  return (
    <div
      className='section-selector'
      onClick={() => setSelectionState('realm')}
    >
      {title}
    </div>
  );
}

export default SectionSelector;
