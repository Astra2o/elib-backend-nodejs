import { NextFunction,Request,Response } from "express";
import fs from 'node:fs'
import createHttpError from "http-errors";
import {v2 as cloudinary} from 'cloudinary';
import { conf } from "../config/config";



    // Configuration
 export  default  cloudinary.config({ 
        cloud_name: conf.cloudName, 
        api_key: conf.cloudApiKey, 
        api_secret:conf.cloudApiSecret 
    });

import path from "path";
// import { log } from "console";
// import createHttpError from "http-errors";
import bookModel from "./bookModel";
import { AuthRequest } from "../middleware/authenticate";
// import { error, log } from "console";
const createBook = async (req:Request,res:Response,next:NextFunction) => {
    // res.json({msg:'sucess book added'})

    // const {}=req.body;
    // console.log('files',req.files);
    try {
        const {title,genre}=req.body;
        const files = req.files as {[filename:string]:Express.Multer.File[]}
        const coverImageMimeType=files.coverImg[0].mimetype.split('/').at(-1);
        // console.log(coverImageMimeType);
        
        const filename=files.coverImg[0].filename;
        const filepath = path.resolve(__dirname,'../../public/data/uploads',filename)
        // console.log(filepath);

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
            //  console.log(uploadResult,uploadFileResult);
            // @ts-ig nore
            const _req= req as AuthRequest;
        //    console.log('userId',_req.userId);
           
             // save upload link in database

             const newBook = await bookModel.create({
                title,
                genre,
                author:_req.userId,
                coverImg:uploadResult.secure_url,
                file:uploadFileResult.secure_url

            })

            // delete  the temp files that created by multer after uploding on cloudnary and stoe link in the db

            await fs.promises.unlink(filepath);
            await fs.promises.unlink(bookFilepath);
           
            res.status(201).json({id:newBook._id})

        } catch (error) {
            console.log(error);
            return next(createHttpError(500,'error while uploading the files'))
            
        }
        
        
    } catch (error) {
        console.log('error', error); 
        
    }
   
    
}


const updateBook =async (req:Request,res:Response,next:NextFunction)=>{
try {
    

    const {title,genre}=req.body;
    const bookId = req.params.bookId;

    const book = await bookModel.findOne({_id:bookId});
    if(!book){
        return next(createHttpError(404,'book not found'))
    }
    console.log(book.coverImg);
    

// check access only autorized user

    const _req= req as AuthRequest;

    if(book.author.toString() !== _req.userId){
        return next(createHttpError(403,'Unautorized - you can`t update others book'));
    }

    const files = req.files as {[filename:string]:Express.Multer.File[]}

    let completeCoverImg=''

    if(files.coverImg){
    const filename=files.coverImg[0].filename;
    const coverImageMimeType=files.coverImg[0].mimetype.split('/').at(-1);

    const filepath = path.resolve(__dirname,'../../public/data/uploads',filename);


     completeCoverImg= filename    // not nessasry

    const uploadResult =await cloudinary.uploader        // here is an error 
    .upload(filepath,{                                    //  error TypeError: Cannot read properties of undefined (reading 'upload')
        filename_override:completeCoverImg,
        // public_id:'bookcover',
        folder:'book-cover',
        format:coverImageMimeType 
    })
   completeCoverImg=uploadResult.secure_url;
    await fs.promises.unlink(filepath);

    }


    let completeFileName=''

    if(files.file){
    const filename=files.file[0].filename;

    const bookFilepath = path.resolve(__dirname,'../../public/data/uploads',filename);


     completeFileName= filename    // not nessasry

     const uploadFileResult =await cloudinary.uploader        // here is an error 
     .upload(bookFilepath,{
         resource_type:'raw',                                    //  error TypeError: Cannot read properties of undefined (reading 'upload')
         filename_override:completeFileName,
         // public_id:'books',
         folder:'book-file',
         format:'pdf' 
     })
    completeFileName=uploadFileResult.secure_url;
    await fs.promises.unlink(bookFilepath);

    }

    const updatedBook = await bookModel.findOneAndUpdate(
        {_id:bookId},
        {
          title,
          genre,
          coverImg:completeCoverImg?completeCoverImg : book.coverImg ,
          file: completeFileName?completeFileName:book.file
        },
        {
            new:true
        })
        
        res.json(updatedBook)    
    // console.log(filepath);

} catch (error) {
    console.log(error,'error');
    
}












    






}



export {createBook,updateBook}