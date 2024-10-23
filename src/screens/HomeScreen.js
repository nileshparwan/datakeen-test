import React from 'react';
import HomeScreenBanner from '../components/HomeScreenBanner';
import { SignIn, useAuth } from '@clerk/clerk-react';
import Carousel from '../components/Carousel';

const HomeScreen = () => {
  const { isSignedIn } = useAuth();
  return (
    <div>
      <HomeScreenBanner />

      <Carousel />

      {!isSignedIn && (<section className='mx-auto w-full px-4 py-16 sm:px-6 lg:px-8 bg-gray-900 text-white'>
        <h1 class="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Get started today</h1>

        <p class="mx-auto mt-4 max-w-md text-center text-white">
          Whether you're looking to expand your skills, find the perfect course, or embark on a new learning adventure, we provide the tools and guidance to help you succeed
        </p>
        <div className='w-full flex justify-center items-center mt-10'>
          <SignIn />
        </div>
      </section>)}

    </div>
  );
};

export default HomeScreen;
