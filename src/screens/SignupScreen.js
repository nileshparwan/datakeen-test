import { SignUp } from '@clerk/clerk-react';
import React from 'react';

const SignUpScreen = () => {
  return (
    <section className='w-full h-screen flex justify-center items-center'>
      <SignUp />
    </section>
  );
};

export default SignUpScreen;
