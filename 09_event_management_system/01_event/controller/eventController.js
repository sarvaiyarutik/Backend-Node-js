import eventModel from "../model/EventModel.js";
import httpError from "../middleware/httpError.js"
import fs from "fs";

const add = async(req,res,next)=>{

    try{

        const {EventName,EventDescription,EventVenue,EventTicketPrice,EventDate} = req.body;

      const EventPoster = req.files?.EventPoster?.[0]?.path || null;
      const EventImg = req.files?.EventImg?.map((file)=>file.path)||null;
      const EventBanner = req.files?.EventBanner?.map((file) => file.path) || null;      const EventSpeakers = req.files?.EventSpeakers?.map((file)=>file.path)||null;
      const EventDocument = req.files?.EventDocument?.map((file)=>file.path)||null; 

      const newEvent = await eventModel.create({

        EventName,
        EventDescription,
        EventVenue,
        EventTicketPrice,
        EventDate,
        EventImg,
        EventPoster,
        EventBanner,
        EventSpeakers,
        EventDocument
      })

      res.status(201).json({success:true,message:"New Event create",newEvent })

    }catch(error){
        return next(new httpError(error.message,500))
    }

}


const EventGetAll = async (req, res, next) => {
  try {

    const event = await eventModel.find({});

    console.log("EVENT DATA:", event);
    console.log("EVENT COUNT:", event.length);

    return res.status(200).json({
      success: true,
      message: "All event data",
      total: event.length,
      event
    });

  } catch (error) {
    return next(new httpError(error.message, 500));
  }
};

const EventGetById = async(req,res,next)=>{

  try{


    const {id} = req.params;

    const event = await eventModel.findById(id);

    if(!event){
            return next(new httpError("no event found with id ",404));
    }
    res.status(200).json({success:true,message:"Event data found",event})


  }catch(error){
    return next(new httpError(error.message,500))
  }

}

const deleteEvent = async(req,res,next)=>{

  try{

    const  {id} = req.params;

    const event = await eventModel.findByIdAndDelete(id);

    if(!event){
            return next(new httpError("failed to delete event", 400));
    }

    const filesDelete = [

      ...event.EventImg,
      event.EventPoster,
      ...event.EventBanner,
      ...event.EventDocument,
      ...event.EventSpeakers

    ]

    filesDelete.forEach((file)=>{


      if(fs.existsSync(file)){
        fs.unlinkSync(file)
      }else{

         return next(new httpError("failed to delete file"));


      }

    })

        return res.status(200).json({ success: true, message: "event deleted" });



  }catch(error){
    return next(new httpError(error.message,500))
  }

}

const updateManually = async(req,res,next)=>{

  try{

    const {id} = req.params;

    const event = await eventModel.findById(id);
  
    console.log("update event ",event);

    if(!event){
      return next(new httpError("no event data not found ",404))
    }

    const updates = Object.keys(req.body);

    const allowedFields = [
      "EventName",
      "EventDate",
      "EventDescription",
      "EventVenue",
      "EventTicketPrice"

    ]

    const isValidUpdates = updates.every((fields)=>{

        allowedFields.includes(fields)

    });

    if(!isValidUpdates){
      return next(new httpError("only allow fields can be updated",400))
    }

    if(req.files?.EventImg){
      event.EventImg.forEach((file)=>{
        if(fs.existsSync(file)){
          fs.unlinkSync(file);
        }
      })
      event.EventImg = req.files?.EventImg?.map((file)=>file.path)||null;

    }

    updates.forEach((update)=>{
      event[update] = req.body[update];
    })

    await event.save();

    res.status(200).json({success:true,message:"event data update successfully",event})




  }catch(error){
    return next(new httpError(error.message,500));
  }

}

export default {add,EventGetAll,EventGetById,deleteEvent,updateManually};