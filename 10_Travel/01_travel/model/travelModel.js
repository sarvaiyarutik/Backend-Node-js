
import mongoose from "mongoose"

const packageSchema = new mongoose.Schema({

 placeName: {
    type: String,
    required: true
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
  },
  travel_id:{
    type:String
  }
},{timestamps:true})

const travel = mongoose.model("travel path",packageSchema);

export default travel;