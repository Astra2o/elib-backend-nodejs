import app from "./src/app"; 
import { conf } from "./src/config/config";
import connectDB from "./src/config/db";



// console.log(conf);




const startServer=async()=>{
 await connectDB()
    const port = conf.port||3000 ;

    app.listen(port,()=>{
        console.log(`listening on port : ${port}`)
       
        
    })
}

startServer();