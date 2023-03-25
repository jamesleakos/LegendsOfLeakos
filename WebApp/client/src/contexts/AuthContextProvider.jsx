// external
import React, { useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

// internal
import AuthContext from './AuthContext.js';
import SocketContext from './SocketContext.js';
import usePersistedState from '../hooks/usePersistedState.js';

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = usePersistedState('isLoggedIn', false);

  const { disconnectSocket } = useContext(SocketContext);

  const logout = () => {
    axios
      .post('/auth/logout')
      .then((res) => {
        setIsLoggedIn(false);
        disconnectSocket();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const value = {
    isLoggedIn,
    setIsLoggedIn,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
