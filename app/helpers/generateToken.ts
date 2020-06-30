import jwt from 'jsonwebtoken';

function generateToken (user) {
    let secret = process.env.JWTSECRET;
    
    return jwt.sign(user, secret);
}

export default generateToken;