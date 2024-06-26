import {useRef,useEffect,useState} from 'react'
// import { useContext, createContext, useState } from 'react';
import SessionProvider from '../components/sessionprovider'
import Login from '../components/login'
import ProtectedComponent from '../components/protectedcomponent'

export default function Index() {
  return (
    <SessionProvider>
      <Login />
      <ProtectedComponent />
    </SessionProvider>
  );
}

// suno.com
