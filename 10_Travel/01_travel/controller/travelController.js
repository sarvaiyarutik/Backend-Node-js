import travel from "../model/travelModel.js";
import httpError from "../middleware/httpError.js";

const add = async(req,res,next)=>{

    try{

        const {placeName,duration,destination,price,} = req.body

        const travel_img = req.file?.path || null;
        const travel_id = req.file?.path || null;

        const newTravel = await travel.create({

            placeName,duration,destination,price,travel_img,travel_id

        })

        await newTravel.save();

        return res.status(200).json({success:true,message:"package data added successfully",newTravel});

    }catch(error){
        return next(new httpError(error.message));
    }

}

export default {add};