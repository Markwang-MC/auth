import {useRef,useEffect,useState} from 'react'
// import { useContext, createContext, useState } from 'react';
import {SessionProvider} from './sessionprovider'
import Login from './login'
import ProtectedComponent from './protectedcomponent'

export default function Index() {
  return (
    <SessionProvider>
      <Login />
      <ProtectedComponent />
    </SessionProvider>
  );
}

// suno.com
