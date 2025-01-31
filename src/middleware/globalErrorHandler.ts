 
 import  { Request, Response ,NextFunction} from "express";
 import {HttpError} from 'http-errors'
import { conf } from "../config/config";
 
 const globalErrorHandler =((err:HttpError,req:Request,res:Response,next:NextFunction)=>{

    const statusCode= err.statusCode || 500 ;

    return res.status(statusCode).json({
        message:err.message,
        errorStack: conf.env==='development'?  err.stack : ' '
    })

})

export default globalErrorHandler;