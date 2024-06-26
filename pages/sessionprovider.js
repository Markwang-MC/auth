import React, { useContext, createContext, useState } from 'react';
const SessionContext = createContext();
console.log(SessionContext);
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

function useSession () {
  const [session, setSession] = useContext(SessionContext);

  return [session, setSession];
};

export {useSession,SessionProvider}
