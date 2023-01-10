import jwt from 'jsonwebtoken';
import ENV from '../config.js';

export default async function Auth(req, res, next) {
    try {
        
        const token = req.headers.authorization.split(" ")[1];

        //retrive the user details of the loged in user
        const decordToken = await jwt.verify(token, ENV.JWT_TOKEN);

        req.user = decordToken;

        next();

    } catch (error) {
        res.status(401).send({err: "Authentication Faild..."})
    }
}

export function localVariables(req, res, next){
    req.app.locals = {
        OTP : null,
        resetSession: false
    }
    next()
}