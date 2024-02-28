import jwt, { Secret } from 'jsonwebtoken';

function generateAccessToken(data: object): string {
    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET as Secret, { expiresIn: '1h' });
    return accessToken;
}

export default generateAccessToken;