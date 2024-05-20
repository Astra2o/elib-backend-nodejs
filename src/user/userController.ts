import { NextFunction,Request,Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from 'bcrypt'
import { sign } from "jsonwebtoken";
import { conf } from "../config/config";
import { User } from "./userTypes";

const  createUser = async (req:Request,res:Response,next:NextFunction) => {
   const {name,email,password}=req.body
   // validation 
   if (!name||!email||!password) {

    const error = createHttpError(400,'all field are required')
    return next(error)    
   }
   


   // database call

   
   try {
       
       const user=await userModel.findOne({email:email});
       if(user){
        const error= createHttpError(400,'user already exist with this email')
        return next(error)
       }
   } catch (err) {
      return next(createHttpError(500,'error while getting user'))
   }

   // hash password using bycrypt
   const hashedPassword= await bcrypt.hash(password,10,)
let newUser:User;

    try {
         newUser= await userModel.create({
            name,email,password:hashedPassword
           })
    } catch (error) {
        return next(createHttpError(500,'error while creating user'))

    }
  

   // token generation 

   try {
     const token = sign({sub:newUser._id},conf.jwtSecret as string,{expiresIn:'7d'});

    res.json({message:'user register',
        token:token
    })
   } catch (error) {
    return next(createHttpError(500,'error while asign and signin with jwt token '))

   }
  

    
}


const loginUser =async (req:Request,res:Response,next:NextFunction) => {
    const {email,password}=req.body;
    if(!email||!password){
        const error = createHttpError(400,'all field are required')
        return next(error)
    }
let user;
    try {
         user=await userModel.findOne({email:email});

    if (!user) {
        const error = createHttpError(404,'user not found')
        return next(error)
    }
 
    } catch (error) {
        return next(createHttpError(500,'error while find user in db '))

    }
    

    const isMatch = await bcrypt.compare(password,user.password);

    if (!isMatch) {
        return next(createHttpError(400,'username or password are incorrect '))

    }
    // token generation 

   try {
    const token = sign({sub:user._id},conf.jwtSecret as string,{expiresIn:'7d'});

   res.json({message:'user login  sucess',
       token:token
   })
  } catch (error) {
   return next(createHttpError(500,'error while asign and signin with jwt token '))

  }


    // res.json({message:'ok'})
}

export {createUser,loginUser}