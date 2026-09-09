

import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({


    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    ID:{
        type:Number,
        required:true,
        unique:true
    }
    ,
    Course:{
        type:String,
        enum:["fullstack", "graphic design", "ui/ux design", "video editing"],
        default:"FullStack"
    }

})

const Student = mongoose.model("student data",StudentSchema);

export default Student;