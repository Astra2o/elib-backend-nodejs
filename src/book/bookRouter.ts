import express  from "express";
import { createBook,updateBook,booksList,getOneBook,deleteBook } from "./bookController";
import multer from "multer";
import path from "path";
import authenticate from "../middleware/authenticate";

const bookRouter = express.Router();


const upload = multer({
    dest:path.resolve(__dirname,'../../public/data/uploads'),
    limits:{fileSize:10*1024*1024}
})



bookRouter.post('/createbook',authenticate,upload.fields([
    {name:'coverImg',maxCount:1,},
    {name:'file',maxCount:1,}
]),createBook);

// bookRouter.post('/login',loginUser);

bookRouter.patch('/:bookId',authenticate,upload.fields([
    {name:'coverImg',maxCount:1,},
    {name:'file',maxCount:1,}
]),updateBook);

bookRouter.get('/',booksList );

bookRouter.get('/:bookId',getOneBook );

bookRouter.delete('/:bookId',authenticate,deleteBook)

export default bookRouter;