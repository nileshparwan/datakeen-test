import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { useAppContext } from './hooks/context/AppSessionProvider';
import { cn } from './lib/utils';
import Footer from './components/Footer';
import { ClerkLoaded, ClerkLoading, useAuth } from '@clerk/clerk-react';
import BallSvg from './components/BallSvg';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { isSignedIn } = useAuth();
  const { openSidebar, setOpenSidebar } = useAppContext();
  const sidebarstyles = cn('absolute z-10 left-0 top-0 flex h-screen w-fit flex-col justify-between border-r border-gray-200 bg-white text-white md:hidden transform  transition-transform duration-300 ease-in-out', { 'translate-x-0': openSidebar, '-translate-x-full': !openSidebar });

  return (
    <>
      <Header isSignedIn={isSignedIn} setOpenSidebar={setOpenSidebar} />
      <main className='flex w-full relative'>
        <ToastContainer />
        <aside className={sidebarstyles}>
          <Sidebar />
        </aside>
        <div className='flex flex-col size-full'>
          <ClerkLoading>
            <div className='flex items-center justify-center h-screen text-2xl animate-bounce'>
              <BallSvg />
            </div>
          </ClerkLoading>

          <ClerkLoaded>
            <Outlet />
          </ClerkLoaded>

        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
