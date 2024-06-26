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
    const token = sign({username:`is a string (utf-8 encoded), buffer, object, or KeyObject containing either the secret for HMAC algorithms or the PEM encoded private key for RSA and ECDSA. In case of a private key with passphrase an object { key, passphrase } can be used (based on crypto documentation), in this case be sure you pass the algorithm option. When signing with RSA algorithms the minimum modulus length is 2048 except when the allowInsecureKeySizes option is set to true. Private keys below this size will be rejected with an error.
`}, 'secret_key');

    res.send(JSON.stringify({isAuthenticated: true,token}))
  }
}
