// EXTERNAL
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// INTERNAL
// css
import '../styles/styles.css';
// context
import MasterContextProvider from '../contexts/MasterContextProvider.jsx';
// components
// pages
import HomePage from './Home/HomePage.jsx';
import PlayPage from './Play/PlayPage.jsx';
import SignInUpPage from './SignInUp/SignInUpPage.jsx';
import RealmPage from './Realms/RealmPage.jsx';
import WaitlistPage from './Waitlist/WaitlistPage.jsx';
// utility components
import AnimatedCursor from '../../helpers/animated_cursor.js';
import Protected from './UtilityComponents/Protected.jsx';

// font awesome import
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
library.add(faBars);

// App
// we're doing the Root thing to allow for useNavigate, which needs to be inside BrowserRouter
function App() {
  return (
    <BrowserRouter>
      <MasterContextProvider>
        <Root />
      </MasterContextProvider>
    </BrowserRouter>
  );
}
function Root() {
  return (
    <div>
      <AnimatedCursor />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route
          path='/play'
          element={
            <Protected>
              <PlayPage />
            </Protected>
          }
        />
        <Route
          path='/test'
          element={
            <Protected>
              <div>TEST TEST TEST</div>
            </Protected>
          }
        />
        <Route
          path='/collections'
          element={
            <Protected>
              <RealmPage />
            </Protected>
          }
        />
        <Route path='/sign-in-up' element={<SignInUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
