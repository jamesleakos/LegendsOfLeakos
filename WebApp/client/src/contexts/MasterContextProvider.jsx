import React from 'react';
import SoundContextProvider from './SoundContextProvider.jsx';

const MasterContextProvider = ({ children }) => {
  return (
    <SoundContextProvider>
      {/* Wrap with any other context providers */}
      {children}
    </SoundContextProvider>
  );
};

export default MasterContextProvider;
