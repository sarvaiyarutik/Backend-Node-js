import travel from "../model/travelModel.js";
import httpError from "../middleware/httpError.js";
import fs from "fs";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { deleteModel } from "mongoose";
import cloudinary from "../config/cloudinary.js";

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

const getAll = async(req,res,next)=>{

    try{

        const packageAll = await travel.find({});

        if(packageAll.length === 0){

            return next(new httpError("travel package not found",404))
        }

        return res.status(200).json({success:true, message:"Travel package Found",total:packageAll.length,packageAll});


    }catch(error){
        return next(new httpError(error.message));

    }

}

const getByID = async (req,res,next) => {

    try{
        
        const {id} = req.params

        const packageId = await travel.findById(id);

        if(!packageId){
       
            return next(new httpError(""))

        }

        res.status(200).json({success:true,message:"travel package id found",packageId});


    }catch(error){
        return next(new httpError(error.message));

    }

    
}
const packageDelete = async(req,res,next)=>{


    try{

        const {id} = req.params

        const deleteData = await travel.findById(id);

        if(!deleteData){
            return next(new httpError("package id not found",404));
        }
    
        await cloudinary.uploader.destroy(deleteData.travel_id);

        await deleteData.deleteOne();

        res.status(200).json({success:true,message:"Event delete successfully"})


    }catch(error){

        return next(new httpError(error.message,500))
    }

}

const updataPackage = async(req,res,next)=>{

    try{

        const {id} = req.params;

        const updateData = await travel.findById(id);

        if(!updateData){

            return next(new httpError("package id not found"));

        }

        const update = Object.keys(req.body);

        const allowField = [

            "placeName",
            "duration",
             "destination",
             "price",

        ]

        const isValid = update.every((field)=>{
           return allowField.includes(field);
        })

        if(!isValid){

            return next(new httpError("only allowed field can be updated",400));


        }

        if(req.file){
            await cloudinary.uploader.destroy(updateData.travel_id)
         
            updateData.travel_id = req.file.filename;
            updateData.travel_img = req.file.path;
        
        }
        

        update.forEach((u)=>{

            updateData[u] = req.body[u]

        })

        await updateData.save();

        res.status(200).json({success:true,message:"package update",updateData})


    }catch(error){

        return next(new httpError(error.message,500))

    }

}

export default { add , getAll , getByID, packageDelete,updataPackage};