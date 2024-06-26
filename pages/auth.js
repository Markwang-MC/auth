import {useRouter} from 'next/router'
export default function Auth() {
  const {query} = useRouter()
  const {url} = query
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
          if (data.isAuthenticated) window.location.href=`${url}?token=${data.token}`
        })
      }}>
        <input name='user' placeholder='username'/>
        <input name='password' placeholder='password' />
        <input type='submit' value='submit' />

      </form>
    </div>
  )
}
