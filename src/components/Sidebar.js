import React from 'react';
import { navigations } from '../constant';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useAppContext } from '../hooks/context/AppSessionProvider';

const Sidebar = () => {
  const path = useLocation();
  const navigate = useNavigate();
  const { setOpenSidebar } = useAppContext();
  const isActive = (currentPath) => path.pathname === currentPath;
  const linkStyle = currentPath  => cn("text-gray-500 transition cursor-pointer flex gap-3 items-center py-1 p-3 rounded-lg justify-center",
  {
    "bg-bank-gradient": isActive(currentPath),
    'text-white': isActive(currentPath)
  })

  const redirectUser = (path) => navigate(path);

  const closeSidebarOnClick = (path) => {
    setOpenSidebar(false);
    redirectUser(path);
  }

  return <nav className='w-[240px] h-full flex flex-col'>
    <ul className='flex flex-col gap-4 items-center space-y-10 mt-10'>
      {
        navigations.map((navlinks) => (
          <li key={navlinks.name}>
            <button
              type='button'
              className={linkStyle(navlinks.path)}
              onClick={() => closeSidebarOnClick(navlinks.path)}
            >
              {navlinks.name}
            </button>
          </li>
        ))
      }
    </ul>
  </nav>;
};

export default Sidebar;
