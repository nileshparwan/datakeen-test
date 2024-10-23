import { SignIn } from '@clerk/clerk-react';
import React from 'react'

const SignInScreen = () => {
  return (
    <section className='w-full h-screen flex justify-center items-center'>
      <SignIn />
    </section>
  )
}

export default SignInScreen
