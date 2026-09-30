
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({


    eventName:{
        type:String,
        required:true,
        trim:true
    },
    eventDate:{
        type:String,
        required:true,
    },
    eventDescription:{
        type:String
    },
    eventIMG:{
        type:[String]
    },
    {
        
    }
}) 