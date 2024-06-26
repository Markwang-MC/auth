import {useEffect} from 'react'
import {useSession} from './sessionprovider'
export default function Login(){
  const [session, setSession] = useSession();

  useEffect(()=>{
    // console.log(session);
  },[session])


  const handleLogin = () => {
    fetch('api/login', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        username: 'wxy',
        password: '1234567',
      },
    })
    .then((response) => response.text())
    .then((data)=>{
      setSession(JSON.parse(data));
    })


  };

  return (
    <div>
      <button onClick={handleLogin}>登录</button>
    </div>
  );
};
