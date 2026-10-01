
import mongoose  from "mongoose";


const EventSchema = new mongoose.Schema({

    EventName:{
        type:String,
        required:true,
        trim:true
    },  
    EventDate:{
        type:String,
        required:true
    },
    EventDescription:{
        type:String
    },
    EventImg:{
        type:[String]
    },
    EventPoster:{

        type:String,
        required:true
    },
    EventBanner:{
        type:String
    },
    EventVenue:{
        type:String,
        required:true
    },
    EventSpeakers:{
        type:[String]
    },
    EventTicketPrice:{
        type:Number,
        required:true
    },
    EventDocument:{
        type:[String],
        required:true
    }


})

const eventModel = mongoose.model("Event Data",EventSchema);

export default eventModel;