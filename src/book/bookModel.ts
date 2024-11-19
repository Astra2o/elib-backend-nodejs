import mongoose from "mongoose";
import { Book } from "./bookType";

const bookSchema = new mongoose.Schema<Book>({

    title:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    description:{
        type:String,
        required:true
    },
    coverImg:{
        type:String,
        required:true
    },
    file:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        required:true
    }
},{timestamps:true}
)

export default mongoose.model('book',bookSchema)
