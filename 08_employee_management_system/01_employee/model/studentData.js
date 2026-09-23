
import express from "express";
import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({

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

    },
    department:{
        type:String,
        enum:["manager","hr","finance","it"]
    },
    mobile:{
        type:Number,
        minlength:10,
         required:true

    }
    

})


const Employee = mongoose.model("employee Data ",employeeSchema)

export default Employee;