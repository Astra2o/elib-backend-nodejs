import express, { Request, Response ,NextFunction} from "express";
import createHttpError,{HttpError} from 'http-errors'
import { conf } from "./config/config";
import globalErrorHandler from "./middleware/globalErrorHandler";
import userRouter from "./user/userRouter";
// import { create } from "domain";
// import { error } from "console";
const app = express()

// endpoint - ROUTES
// http methods - get,post,put,patch,delete

app.get('/',(req,res,next)=>{
    // const error = createHttpError(400,'something went wrong')
    // throw error
    res.json({message:'welcome'})
})


app.use('/api/users',userRouter)

app.use(globalErrorHandler)

export default app;
