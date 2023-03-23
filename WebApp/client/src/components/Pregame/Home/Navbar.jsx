// external
import React from 'react';
import { Link } from 'react-router-dom';

// internal
import SoundContext from '../../../contexts/SoundContext.js';
import AuthContext from '../../../contexts/AuthContext.js';
// css
import { NavbarStyled } from './styles/Navbar.styled.js';

function Navbar() {
  const soundContext = React.useContext(SoundContext);
  const authContext = React.useContext(AuthContext);

  const logout = () => {
    soundContext.playClick();
    authContext.logout();
  };

  return (
    <NavbarStyled className='navbar'>
      <div className='navbar-item left'>
        <Link
          to='/play'
          className='clickable-link'
          onClick={soundContext.playClick}
        >
          Battle
        </Link>
      </div>
      <div className='navbar-item left'>
        <Link
          to='/test'
          className='clickable-link'
          onClick={soundContext.playClick}
        >
          Realms
        </Link>
      </div>
      <div className='navbar-item right'>
        <Link to='/test' className='clickable-link' onClick={logout}>
          Logout
        </Link>
      </div>
      <div className='navbar-item right'>
        <Link
          to='/test'
          className='clickable-link'
          onClick={soundContext.playClick}
        >
          Tidings
        </Link>
      </div>
    </NavbarStyled>
  );
}

export default Navbar;
