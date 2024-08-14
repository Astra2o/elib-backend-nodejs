import { NextFunction,Request,Response } from "express";
// import createHttpError from "http-errors";
import {v2 as cloudinary} from 'cloudinary';
import { conf } from "../config/config";



    // Configuration
 export  default  cloudinary.config({ 
        cloud_name: conf.cloudName, 
        api_key: conf.cloudApiKey, 
        api_secret:conf.cloudApiSecret 
    });

import path from "path";
import { log } from "console";
import createHttpError from "http-errors";
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

        const bookFileName = files.file[0].filename;
        const bookFilepath = path.resolve(__dirname,'../../public/data/uploads',bookFileName)
       

        try {
            const uploadResult =await cloudinary.uploader        // here is an error 
            .upload(filepath,{                                    //  error TypeError: Cannot read properties of undefined (reading 'upload')
                filename_override:filename,
                // public_id:'bookcover',
                folder:'book-cover',
                format:coverImageMimeType 
            })

            const uploadFileResult =await cloudinary.uploader        // here is an error 
            .upload(bookFilepath,{
                resource_type:'raw',                                    //  error TypeError: Cannot read properties of undefined (reading 'upload')
                filename_override:bookFileName,
                // public_id:'books',
                folder:'book-file',
                format:'pdf' 
            })
             console.log(uploadResult,uploadFileResult);
        } catch (error) {
            console.log(error);
            return next(createHttpError(500,'error while uploading the files'))
            
        }
        
        
        res.send('sucess')
    } catch (error) {
        console.log('error', error); 
        
    }
   
    
}
export {createBook}