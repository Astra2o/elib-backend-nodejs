import {config} from "dotenv";

 config();



const _config = {
    port:process.env.PORT ,
    dbUrl:process.env.MONGO_CONNECTION_STRING,
    env:process.env.NODE_ENV,
    jwtSecret : process.env.JWT_SECRET,
    cloudName: process.env.LOUDINARY_CLOUD ,
    cloudApiKey: process.env.CLOUDINARY_APIKEY ,
    cloudApiSecret:process.env.CLOUDINARY_APISECRET
}

// console.log(process.env.PORT);


export const conf =Object.freeze(_config)    // read only value to avoid override