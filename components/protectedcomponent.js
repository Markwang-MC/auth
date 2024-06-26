import {useState} from 'react'
import useSession from './usesession'
export default function ProtectedComponent() {
  const [session] = useSession();
  // const [session, setSession] = useState(0);

  if (!session.isAuthenticated) {
    return <div>请先登录</div>;
  }

  console.log(session);

  return (
    <div>
      <a onClick={()=>{
        fetch('/api/logged',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            token: session.token
          }
        })
      }}>
        点击获得数据
      </a>
    </div>
  );
};
