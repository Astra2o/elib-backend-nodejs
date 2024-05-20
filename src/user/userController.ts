import { NextFunction,Request,Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from 'bcrypt'
import { sign } from "jsonwebtoken";
import { conf } from "../config/config";

const  createUser = async (req:Request,res:Response,next:NextFunction) => {
   const {name,email,password}=req.body
   // validation 
   if (!name||!email||!password) {

    const error = createHttpError(400,'all field are required')
    return next(error)    
   }
   


   // database call

   const user=await userModel.findOne({email:email});
   if(user){
    const error= createHttpError(400,'user already exist with this email')
    return next(error)
   }

   // hash password using bycrypt
   const hashedPassword= await bcrypt.hash(password,10,)

   const newUser= await userModel.create({
    name,email,password:hashedPassword
   })

   // token generation 
   const token = sign({sub:newUser._id},conf.jwtSecret as string,{expiresIn:'7d'});

    res.json({message:'user register',
        token:token
    })

    
}

export {createUser}