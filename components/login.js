import {useState} from 'react'
import useSession from './usesession'
export default function Login(){
  const [session, setSession] = useSession();
  // const [session, setSession] = useState(0);

  const handleLogin = () => {
    fetch('api/login', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        username: 'wxy',
        password: '1234567',
      },
    })
    .then((response) => response.json())
    .then((data)=>{
      setSession(data);
    })


  };

  return (
    <div>
      <button onClick={handleLogin}>登录</button>
    </div>
  );
};
