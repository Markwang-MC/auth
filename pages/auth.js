import {useRouter} from 'next/router'
export default function Auth() {
  const {query} = useRouter()
  const {website,port} = query
  return (
    <div>
      <form onSubmit={(e)=>{
        e.preventDefault()
        let {user,password} = e.target
        fetch('api/auth',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            user:user.value,
            password:password.value
          },
        })
        .then((res)=>res.json())
        .then((data)=>{
          if (data.status==200) window.location.href=''
        })
      }}>
        <input name='user' placeholder='username'/>
        <input name='password' placeholder='password' />
        <input type='submit' value='submit' />

      </form>
    </div>
  )
}
