// external
import React, { useEffect } from 'react';

// internal
// components
import Navbar from './Navbar.jsx';

function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='home-page'>
      <Navbar />
    </div>
  );
}

export default HomePage;
