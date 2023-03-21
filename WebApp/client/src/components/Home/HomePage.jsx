import React, { useEffect } from 'react';
import SoundContext from '../../contexts/SoundContext.js';

function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const context = React.useContext(SoundContext);

  return (
    <div className='home-page' onClick={context.playHover}>
      HOME PAGE
    </div>
  );
}

export default HomePage;
