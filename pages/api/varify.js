import jwt from 'jsonwebtoken';

export default function Handler(req,res) {
  let token = req.headers.token
  const auth_key = process.env.AUTH_KEY
  try {
    let decoded = jwt.varify({token},auth_key)
    res.end(JSON.stringify({isAuthenticated:true,user:decoded}))
  } catch (e) {
    res.end(JSON.stringify({isAuthenticated:false,user:null}))
  }
}
