

import mongoose from "mongoose";
import express from "express";

const EmployeeSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    GRID:{
        type:Number,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    department:{
        type:String,
        unum:["IPS","ARMY",'CA',"PM"]
    }

})

const employee = mongoose.model("Employee Data",EmployeeSchema)

export default employee;