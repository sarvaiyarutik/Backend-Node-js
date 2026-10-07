import httpError from "../middleware/httpError.js"
import eventModel from "../model/eventModel.js";

const add = async(req,resizeBy,next)=>{

    try{

        const {eventName,eventDate,eventDescription,eventVenue,eventTIcketPrice} = req.body

        const eventPoster = req.fil

    }catch(error){
        return next(new httpError(error.message,500))
    }

}