import {useState,useContext} from 'react'
export default function useSession () {
  const [session, setSession] = useContext(SessionContext);

  return [session, setSession];
};
