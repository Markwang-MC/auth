import React, { useContext, createContext, useState } from 'react';
import SessionContext from './sessionContext';

function SessionProvider ({ children }){
  const [session, setSession] = useState({
    isAuthenticated: false,
    user: null,
  });
  return (
    <SessionContext.Provider value={[session, setSession]}>
      {children}
    </SessionContext.Provider>
  );
};



export default SessionProvider
