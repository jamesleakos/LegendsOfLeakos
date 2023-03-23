// external
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
// internal
// components
import Navbar from '../Home/Navbar.jsx';
// constants
import { CONNECTION_URL } from '../../../network_constants.js';

function PlayPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [socket, setSocket] = React.useState(null);

  useEffect(() => {
    const s = io(CONNECTION_URL, { transport: ['websocket'] });
    setSocket(s);
  }, []);

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
      <Navbar />
    </div>
  );
}

export default PlayPage;
