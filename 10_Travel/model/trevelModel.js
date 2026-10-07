
import mongoose from "mongoose"

const packageSchema = new mongoose.Schema({

  placeName:{
    type:true,
    required:true
  },
  duration:{
    type:String,
    required:true
  },
  destination:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  travel_img:{
    type:String,
    required:true
  }
},{timestamps:true})

const travel = mongoose.model("travel path",travelSchema);

export default travel;