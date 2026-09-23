
import model from "../model/studentData.js"
import httpError from "../middleware/httpError.js"
import Employee from "../model/studentData.js";

const add = async (req,res,next)=>{

    try{

        const {name,email,GRID,mobile,department} = req.body;

      const newEmployee = {
    name, email, GRID, mobile, department
}

const newEmployee1 = await new Employee({
    name, email, GRID, mobile, department
})
        res.status(201).json({success:true,message:"data added successfully",newEmployee})

    }catch(error){
        return next(new httpError(error.message))
    }

}


const employeeDataShow = async(req,res,next)=>{

    try{

        const {id} = req.params;

        const employee = await Employee.find({});

        if(employee.length === 0){
            return next(new httpError("Employee not found",404))
        }

        res.status(200).json({success:true,message:"employee data fetched successfully",total:employee.length})

    }catch(error){
        return next(new httpError(error.message,500));
    }

}



export default {add,employeeDataShow};