import React from 'react';
import SoundContextProvider from './SoundContextProvider.jsx';
import AuthContextProvider from './AuthContextProvider.jsx';
import SocketContextProvider from './SocketContextProvider.jsx';

const MasterContextProvider = ({ children }) => {
  return (
    <SoundContextProvider>
      <SocketContextProvider>
        {/* Auth needs access to socket */}
        <AuthContextProvider>{children}</AuthContextProvider>
      </SocketContextProvider>
    </SoundContextProvider>
  );
};

export default MasterContextProvider;
