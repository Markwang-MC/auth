import jwt from 'jsonwebtoken';


export default function handler(req, res) {
  let token = req.headers.token
  const decoded = jwt.verify(token,'secret_key');
  console.log('--------------',decoded);
}
