import {config} from "dotenv";

 config();



const _config = {
    port:process.env.PORT ,
    dbUrl:process.env.MONGO_CONNECTION_STRING,
}

// console.log(process.env.PORT);


export const conf =Object.freeze(_config)    // read only value to avoid override