const jwt = require('jsonwebtoken')
const fs = require('fs')
function generateToken(user) {
    const private_key = fs.readFileSync('./.ssh/private.rsa')
    // 创建 token 
    let token = jwt.sign({
        avatar:user.avatar,
        user:user.nickname,
        gmail:user.gmail
    }, private_key, {algorithm: 'RS256'});
    return token;
}

async function authenticateToken(authHeader) {
    const token = authHeader && authHeader.split(' ')[1];
    const public_key = fs.readFileSync('./path/to/public_key.pem');
    return await jwt.verify(token, public_key)
}

export {authenticateToken,generateToken}