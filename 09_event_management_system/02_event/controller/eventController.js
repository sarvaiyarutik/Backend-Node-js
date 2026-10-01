
import EventModel from "../model/eventModel.js";
import httpError from "../middleware/httpError.js"
import fs from "fs";


const add = async(req,res,next)=>{

    try{

        const {
            eventName,
            eventDate,
            eventDescription,
            eventVenue,
            eventTIcketPrice
        } = req.body;

     const eventPoster = req.files?.eventPoster?.[0]?.path || null;
     const eventIMG = req.files?.eventIMG?.map((file)=>file.path)||null;
     const eventBanner = req.files?.eventBanner?.map((file)=>file.path) || null;
     const eventSpeaker = req.files?.eventSpeaker?.map((file)=>file.path)||null;
     const eventDocument = req.files?.eventDocument?.map((file)=>file.path)||null;  
   

     const newEvent = await EventModel.create({
            eventName,
            eventDate,
            eventDescription,
            eventVenue,
            eventTIcketPrice,
            eventPoster,
            eventIMG,
            eventBanner,
            eventSpeaker,
            eventDocument
     })

     res.status(201).json({success:true,message:"new event create",newEvent})

    }catch(error){
        return next(new httpError(error.message,500));
    }

}

export default {add};