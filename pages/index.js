import {useRef,useEffect,useState} from 'react'
import SessionProvider from '../components/sessionprovider'
import Login from '../components/login'
import Signup from '../components/signup'

import ProtectedComponent from '../components/protectedcomponent'

export default function Index() {
  return (
    <div>
      <div onClick={()=>{
        fetch('api/handler', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'YOUR_ACCESS_TOKEN',
            'Action': 'read'
          }
        })
          .then(response => response.json())
          .then(data => {
            console.log('Fetched data with header:', data);
          })
          .catch(error => {
            console.error('Fetch error:', error);
          });
        
      }}>send</div>
    </div>
  )
  // return (
  //   <Signup />
  // )
  // return (
  //   <SessionProvider>
  //     <Login />
  //     <ProtectedComponent />
  //   </SessionProvider>
  // );
}

// suno.com
