import { Link } from "react-router-dom";
import { navigations } from "../constant";

const Footer = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className='bg-gray-100'>
      <div className='relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24'>
        <div className='absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8'>
          <button type='button' onClick={scrollToTop}
            className='inline-block rounded-full bg-[#2F4BFF] p-2 text-white shadow transition hover:bg-[#2F4BFF]/75 sm:p-3 lg:p-4'
          >
            <span className='sr-only'>Back to top</span>

            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='size-5'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <title>logo</title>
              <path
                fillRule='evenodd'
                d='M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </div>

        <div className='lg:flex lg:items-end lg:justify-between'>
          <div>
            <div className='flex justify-center items-center text-teal-600 lg:justify-start'>
              <svg
                className='h-20'
                width="64px"
                height="64px"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
                transform="rotate(0)"
              >
                <title>logo</title>
                <g id="SVGRepo_bgCarrier" stroke-width="0" />
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                <g id="SVGRepo_iconCarrier">
                  <path d="M512 960c-92.8 0-160-200-160-448S419.2 64 512 64s160 200 160 448-67.2 448-160 448z m0-32c65.6 0 128-185.6 128-416S577.6 96 512 96s-128 185.6-128 416 62.4 416 128 416z" fill="#050D42" />
                  <path d="M124.8 736c-48-80 92.8-238.4 307.2-363.2S852.8 208 899.2 288 806.4 526.4 592 651.2 171.2 816 124.8 736z m27.2-16c33.6 57.6 225.6 17.6 424-97.6S905.6 361.6 872 304 646.4 286.4 448 401.6 118.4 662.4 152 720z" fill="#050D42" />
                  <path d="M899.2 736c-46.4 80-254.4 38.4-467.2-84.8S76.8 368 124.8 288s254.4-38.4 467.2 84.8S947.2 656 899.2 736z m-27.2-16c33.6-57.6-97.6-203.2-296-318.4S184 246.4 152 304 249.6 507.2 448 622.4s392 155.2 424 97.6z" fill="#050D42" />
                  <path d="M512 592c-44.8 0-80-35.2-80-80s35.2-80 80-80 80 35.2 80 80-35.2 80-80 80zM272 312c-27.2 0-48-20.8-48-48s20.8-48 48-48 48 20.8 48 48-20.8 48-48 48zM416 880c-27.2 0-48-20.8-48-48s20.8-48 48-48 48 20.8 48 48-20.8 48-48 48z m448-432c-27.2 0-48-20.8-48-48s20.8-48 48-48 48 20.8 48 48-20.8 48-48 48z" fill="#2F4BFF" />
                </g>
              </svg>
              <p className="text-3xl text-[#2F4BFF]">Reactive</p>
            </div>

            <p className='mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500 lg:text-left'>
              Our platform connects you with the best courses tailored to your goals and interests. Explore a wide range of options and find the perfect fit for your personal or professional growth.
            </p>
          </div>

          <ul className='mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12'>
            {
              navigations.map((navlinks) => (
                navlinks.path !== "/" && <li key={navlinks.name}>
                  <Link
                    className='text-gray-700 transition hover:text-gray-700/75'
                    to={navlinks.path}
                  >
                    {navlinks.name}
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>

        <p className='mt-12 text-center text-sm text-gray-500 lg:text-right'>
          Copyright &copy; 2024. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
