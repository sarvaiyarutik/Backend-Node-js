
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
   
      eventPoster: {
        type:String,
        required:true
    },
    eventBanner:{
        type:String
    },
    eventVenue:{
        type:String,
        required:true
    },
    eventSpeaker:{
        type:[String]
    },
    eventTIcketPrice:{
        type:Number,
        required:true
    },
    eventDocument:{
         type:[String],
         required:true
    }

})  

const event = mongoose.model("Event model",eventSchema);

export default event;