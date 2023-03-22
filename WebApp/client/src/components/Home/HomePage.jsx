// external
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
// internal
import SoundContext from '../../contexts/SoundContext.js';
import AuthContext from '../../contexts/AuthContext.js';
// constants
import { CONNECTION_URL } from '../../network_constants.js';

function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [socket, setSocket] = React.useState(null);

  useEffect(() => {
    const s = io(CONNECTION_URL, { transport: ['websocket'] });
    setSocket(s);
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

  useEffect(() => {
    console.log('getting realms...');
    axios
      .get('/realms')
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
