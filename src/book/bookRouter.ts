import express  from "express";
import { createBook } from "./bookController";
import multer from "multer";
import path from "path";

const bookRouter = express.Router();


const upload = multer({
    dest:path.resolve(__dirname,'../../public/data/uploads'),
    limits:{fileSize:10*1024*1024}
})



bookRouter.post('/createbook',upload.fields([
    {name:'coverImg',maxCount:1,},
    {name:'file',maxCount:1,}
]),createBook);

// bookRouter.post('/login',loginUser);


export default bookRouter;