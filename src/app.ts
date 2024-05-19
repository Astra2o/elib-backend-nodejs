import express from "express";

const app = express()

// endpoint - ROUTES
// http methods - get,post,put,patch,delete

app.get('/',(req,res,next)=>{
    res.json({message:'welcome'})
})






export default app;
