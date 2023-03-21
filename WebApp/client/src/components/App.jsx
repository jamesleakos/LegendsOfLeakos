// EXTERNAL
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';

// INTERNAL
// constants
import { CONNECTION_URL } from '../network_constants.js';
// css
import '../styles.css';
// hooks
import usePersistedState from '../hooks/usePersistedState.js';
// context
import MasterContextProvider from '../contexts/MasterContextProvider.jsx';
// components
import Home from './Home/HomePage.jsx';
import SignInUpPage from './SignInUp/SignInUpPage.jsx';
import Protected from './UtilityComponents/Protected.jsx';

// App
// we're doing the Root thing to allow for useNavigate, which needs to be inside BrowserRouter
function App() {
  return (
    <MasterContextProvider>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </MasterContextProvider>
  );
}
function Root() {
  // check if user is logged in
  const [isLoggedIn, setIsLoggedIn] = usePersistedState('isLoggedIn', false);
  useEffect(() => {
    axios
      .get('/auth/check-auth')
      .then((res) => {
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

  return (
    <div>
      <Routes>
        <Route
          path='/'
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <Home />
            </Protected>
          }
        />
        <Route
          path='/test'
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <div>TEST TEST TEST</div>
            </Protected>
          }
        />
        <Route
          path='/sign-in-up'
          element={<SignInUpPage setIsLoggedIn={setIsLoggedIn} />}
        />
      </Routes>
    </div>
  );
}

export default App;
