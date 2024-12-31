import React from 'react';
import { Link } from 'react-router-dom';
import { navigations } from '../constant';
import { UserButton } from '@clerk/clerk-react';

const Header = ({ setOpenSidebar, isSignedIn }) => {
  return (
    <header className='bg-white shadow-lg'>
      <div className='mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8'>
        <a className='block text-teal-600' href='/'>
          <span className='sr-only'>Home</span>

          <svg
            className='h-12'
            width="64px"
            height="64px"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
            transform="rotate(0)"
          >
            <title>logo</title>
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
            <g id="SVGRepo_iconCarrier">
              <path d="M512 960c-92.8 0-160-200-160-448S419.2 64 512 64s160 200 160 448-67.2 448-160 448z m0-32c65.6 0 128-185.6 128-416S577.6 96 512 96s-128 185.6-128 416 62.4 416 128 416z" fill="#050D42" />
              <path d="M124.8 736c-48-80 92.8-238.4 307.2-363.2S852.8 208 899.2 288 806.4 526.4 592 651.2 171.2 816 124.8 736z m27.2-16c33.6 57.6 225.6 17.6 424-97.6S905.6 361.6 872 304 646.4 286.4 448 401.6 118.4 662.4 152 720z" fill="#050D42" />
              <path d="M899.2 736c-46.4 80-254.4 38.4-467.2-84.8S76.8 368 124.8 288s254.4-38.4 467.2 84.8S947.2 656 899.2 736z m-27.2-16c33.6-57.6-97.6-203.2-296-318.4S184 246.4 152 304 249.6 507.2 448 622.4s392 155.2 424 97.6z" fill="#050D42" />
              <path d="M512 592c-44.8 0-80-35.2-80-80s35.2-80 80-80 80 35.2 80 80-35.2 80-80 80zM272 312c-27.2 0-48-20.8-48-48s20.8-48 48-48 48 20.8 48 48-20.8 48-48 48zM416 880c-27.2 0-48-20.8-48-48s20.8-48 48-48 48 20.8 48 48-20.8 48-48 48z m448-432c-27.2 0-48-20.8-48-48s20.8-48 48-48 48 20.8 48 48-20.8 48-48 48z" fill="#2F4BFF" />
            </g>
          </svg>

        </a>

        <div className='flex flex-1 items-center justify-end md:justify-between'>
          <nav aria-label='Global' className='hidden md:block'>
            <ul className='flex items-center gap-6 text-sm'>
              {
                navigations.map((navlinks) => (
                  <li key={navlinks.name}>
                    <Link
                      className='text-gray-500 transition hover:text-gray-500/75'
                      to={navlinks.path}
                    >
                      {navlinks.name}
                    </Link>
                  </li>
                ))
              }

            </ul>
          </nav>

          <div className='flex items-center gap-4'>
            <div className='sm:flex sm:gap-4'>
              {
                isSignedIn ? (
                  <UserButton />
                ) : (
                  <>
                    <Link
                      className='block rounded-md bg-[#2F4BFF] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#2F4BFF]/75'
                      to='/sign-in'
                    >
                      Login
                    </Link>

                    <Link
                      className='hidden rounded-md px-5 py-2.5 text-sm font-medium text-white bg-[#2F4BFF] transition hover:text-white/75 hover:bg-[#2F4BFF]/75 sm:block'
                      to='/sign-up'
                    >
                      Register
                    </Link>
                  </>
                )
              }


            </div>

            {/* burger menu */}
            <button
              type='button'
              onClick={() => setOpenSidebar((prev) => !prev)}
              className='block rounded p-2.5 text-white bg-[#2F4BFF] transition hover:text-gray-600/75 md:hidden'
            >
              <span className='sr-only'>Toggle menu</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='size-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth='2'
              >
                <title>logo</title>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
