import jwt from 'jsonwebtoken';
export default function handler(req, res) {
  let token = req.headers.token
  const decoded = jwt.verify(token,'secret_key');
  if (decoded) res.end({status:200,decoded})
  res.end({status:403})
}
