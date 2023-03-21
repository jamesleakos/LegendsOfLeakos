import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SoundContext from '../../contexts/SoundContext.js';
import AuthContext from '../../contexts/AuthContext.js';

function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const soundContext = React.useContext(SoundContext);
  const authContext = React.useContext(AuthContext);

  const logout = () => {
    soundContext.playClick();
    authContext.logout();
  };

  const navigate = useNavigate();
  const goToTest = () => {
    navigate('/test');
  };

  return (
    <div className='home-page'>
      {/* logout button */}
      <div className='logout-button' onClick={logout}>
        Logout
      </div>
      {/* navigate to test */}
      <div className='test-button' onClick={goToTest}>
        Go to test
      </div>
    </div>
  );
}

export default HomePage;
