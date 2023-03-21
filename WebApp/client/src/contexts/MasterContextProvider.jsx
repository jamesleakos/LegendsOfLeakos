import React from 'react';
import SoundContextProvider from './SoundContextProvider.jsx';
import AuthContextProvider from './AuthContextProvider.jsx';

const MasterContextProvider = ({ children }) => {
  return (
    <SoundContextProvider>
      <AuthContextProvider>
        {/* Wrap with any other context providers */}
        {children}
      </AuthContextProvider>
    </SoundContextProvider>
  );
};

export default MasterContextProvider;
