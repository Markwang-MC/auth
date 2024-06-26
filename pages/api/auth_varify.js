import jwt from 'jsonwebtoken';
export default function handler(req, res) {
  let token = req.headers.token
  try {
    const decoded = jwt.verify(token,'secret_key');
    res.end(JSON.stringify({isAuthenticated:true,users: decoded}))
  } catch (e) {
    res.end(JSON.stringify({isAuthenticated:false,users: null}))

  }
}
