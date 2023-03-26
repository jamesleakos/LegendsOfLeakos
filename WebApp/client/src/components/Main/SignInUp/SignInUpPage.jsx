import React, { useEffect } from 'react';

import SignInUp from './SignInUpComp.jsx';

function SignInUpPage({ setIsLoggedIn }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='sign-in-up-page'>
      <SignInUp setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
}

export default SignInUpPage;
