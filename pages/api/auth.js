import { sign } from 'jsonwebtoken';

export default function handler(req, res) {
  const users = {
    'wangfei':'1234567',
    'whx':'1234567',
    'wxy':'1234567'
  }
  let {user,password} = req.headers
  if (!users[user]) {
    res.end(JSON.stringify({isAuthenticated: false,token: null}))
    return
  }
  if (users[user]==password) {
    const token = sign({user},'auth_key')
    res.end(JSON.stringify({isAuthenticated: true,token})})
    return;
  }
  res.end(JSON.stringify({isAuthenticated: false,token: null}))
}
