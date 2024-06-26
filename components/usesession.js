import {useState,useContext} from 'react'
import SessionContext from './sessionContext';

export default function useSession () {

  const [session, setSession] = useContext(SessionContext);
  return [session, setSession];
};
