import { sign } from 'jsonwebtoken';

export default function handler(req, res) {
  // console.log(typeof req.headers);
  const arr = [
    {'name':'wxy','password':1234567},
    {'name':'wf','password':1234567},
    {'name':'whx','password':1234567}
  ]
  const { username, password } = req.headers
  let user = arr.find((item)=>{
    return username==item.name&&password==item.password;
  })
  if (user) {
    const token = sign({username}, 'secret_key');

    res.send(JSON.stringify({isAuthenticated: true,token}))
  }
}
