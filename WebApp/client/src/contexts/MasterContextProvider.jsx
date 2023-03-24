import React from 'react';
import SoundContextProvider from './SoundContextProvider.jsx';
import AuthContextProvider from './AuthContextProvider.jsx';
import SocketContextProvider from './SocketContextProvider.jsx';

const MasterContextProvider = ({ children }) => {
  return (
    <SoundContextProvider>
      <AuthContextProvider>
        <SocketContextProvider>
          {/* Wrap with any other context providers */}
          {children}
        </SocketContextProvider>
      </AuthContextProvider>
    </SoundContextProvider>
  );
};

export default MasterContextProvider;
