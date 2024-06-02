import { NextFunction,Request,Response } from "express";
import createHttpError from "http-errors";
const createBook = async (req:Request,res:Response,next:NextFunction) => {
    // res.json({msg:'sucess book added'})

    // const {}=req.body;
    console.log('files',req.files);
    
}


export {createBook}