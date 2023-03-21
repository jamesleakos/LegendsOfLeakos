// EXTERNAL
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// INTERNAL
// constants
import { CONNECTION_URL } from '../network_constants.js';
// css
import '../styles.css';
// context
import MasterContextProvider from '../contexts/MasterContextProvider.jsx';
import AuthContext from '../contexts/AuthContext.js';
// components
import Home from './Home/HomePage.jsx';
import SignInUpPage from './SignInUp/SignInUpPage.jsx';
import Protected from './UtilityComponents/Protected.jsx';

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
  // check if user is logged in
  const { isLoggedIn, setIsLoggedIn } = React.useContext(AuthContext);

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
