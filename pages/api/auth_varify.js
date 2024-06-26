import jwt from 'jsonwebtoken';
export default function handler(req, res) {
  console.log({process});
  let auth_key = process.env.auth_key
  console.log({auth_key});
  let token = req.headers.token
  console.log({token});
  try {
    const decoded = jwt.verify(token,auth_key);
    console.log('111111111',decoded);
    res.end(JSON.stringify({isAuthenticated:true,users: decoded}))
  } catch (e) {
    console.log('2222222',e);

    res.end(JSON.stringify({isAuthenticated:false,users: null}))

  }
}
