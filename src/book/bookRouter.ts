import express  from "express";
import { createBook } from "./bookController";

const bookRouter = express.Router();
bookRouter.post('/createbook',createBook);

// bookRouter.post('/login',loginUser);


export default bookRouter;