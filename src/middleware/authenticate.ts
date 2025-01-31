import { NextFunction,Request ,Response} from "express";
import createHttpError from "http-errors";
import { Jwt, verify } from "jsonwebtoken";
import { conf } from "../config/config";

export interface AuthRequest extends Request {
    userId:string
}

const authenticate =(req:Request,res:Response,next:NextFunction)=>{

    const token = req.header('Authorization');   // output =>'Bearer dfhhcqeuifhc37h48rfqieuc'  <---- token after bearer keyword and a space so we are extract token from this string
    if (!token){
        return next(createHttpError(401,'Auth tokan is required'))
    }
    const parsedToken= token.split(' ')[1];
    const decoded = verify(parsedToken,conf.jwtSecret as string);
    console.log('decoded ,',decoded);

    const _req =req as AuthRequest;
    _req.userId = decoded.sub as string;
    next();


}

export default authenticate;