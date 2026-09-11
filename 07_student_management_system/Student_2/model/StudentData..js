

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
    GRID:{
        type:Number,
        required:true,
        unique:true
    }
    ,
    Course:{
        type:String,
        enum:["fullstack", "graphic design", "ui/ux design", "video editing"],
        default:"fullStack"
    }

})

const Employee = mongoose.model("student data",StudentSchema);

export default Employee;