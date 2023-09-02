import { enviroment } from "../../enviroments/enviroment";

const jwt = require("jsonwebtoken");
const SECRET_KEY = enviroment.secretKey;

const expiresIn = "1h";

// Create a token from a payload
export const createToken = (payload: any) => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
}
  
// Verify the token
export const verifyToken = (token: any) => {
    return jwt.verify(token, SECRET_KEY, (err: any, decode: any) => decode !== undefined ? decode : err);
}

export const JWTService = {
    createToken,
    verifyToken
}