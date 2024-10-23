import React, { useState } from 'react';
import MyContext from './context';

const AppProvider = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <MyContext.Provider value={{ openSidebar, setOpenSidebar }}>
      {children}
    </MyContext.Provider>
  );
};

export const useAppContext = () => React.useContext(MyContext);

export default AppProvider;
