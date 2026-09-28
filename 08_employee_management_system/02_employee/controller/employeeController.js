import Employee from "../model/employeeData.js";
import httpError from "../middleware/httpError.js"
import mongoose from "mongoose";


const add = async(req,res,next)=>{

    try{

        const {name,email,GRID,department} = req.body;

        const newEmployee = new Employee({
            name,
            email,
            GRID,
            department
        })

        await newEmployee.save();

        res.status(201).json({success:true,message:"employee added successfully",newEmployee})

    }catch(error){

        return next(new httpError(error.message))
    }

}

const getEmployeeAll = async(req,res,next)=>{

    try{

        const employee =await Employee.find({});

        if(employee.length === 0){

            return res.status(200).json({success:true,message:"Employee data not found"});
        }

        res.status(200).json({success:true,message:"employee all data visible ",total:employee.length,employee});
    }catch(error){
        return next(new httpError(error.message,500))
    }

}

const getFindByIDEmployee = async(req,res,next)=>{

    try{

        const {id} = req.params;

        const valid = mongoose.isValidObjectId();

        if(!valid){
            return next(new httpError("employee with this id not found",404))
        }
         const employee = await Employee.findById(id);

        res.status(200).json({success:true,message:"Employee found",employee})

    }catch(error){
        return next(new httpError(error.message))
    }

}

export default {add,getEmployeeAll,getFindByIDEmployee};