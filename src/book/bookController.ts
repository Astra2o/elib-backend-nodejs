import { NextFunction,Request,Response } from "express";
// import createHttpError from "http-errors";
import cloudinary from "../config/cloudinary";
import path from "path";
// import { error, log } from "console";
const createBook = async (req:Request,res:Response,next:NextFunction) => {
    // res.json({msg:'sucess book added'})

    // const {}=req.body;
    console.log('files',req.files);
    try {
        const files = req.files as {[filename:string]:Express.Multer.File[]}
        const coverImageMimeType=files.coverImg[0].mimetype.split('/').at(-1);
        console.log(coverImageMimeType);
        
        const filename=files.coverImg[0].filename;
        const filepath = path.resolve(__dirname,'../../public/data/uploads',filename)
        console.log(filepath);
        
//         const uploadResult =await cloudinary.uploader        // here is an error 
//         .upload(filepath,{                                    //  error TypeError: Cannot read properties of undefined (reading 'upload')
//             filename_override:filename,
//             public_id:'bookcover',
//             folder:'book-cover',
//             format:coverImageMimeType 
//         }) .then((result: any)=>console.log(result))
// console.log(uploadResult);
        res.send('sucess')
    } catch (error) {
        console.log('error', error); 
        
    }
   
    
}
export {createBook}