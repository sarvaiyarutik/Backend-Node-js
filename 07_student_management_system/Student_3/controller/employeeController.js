import httpError from "../middleware/httpError.js";
import employee from "../model/employeeData.js"


const add = async (req,res,next)=>{

    try{

        const {name,email,GRID,Work} = req.body;

        const newEmployee = await employee({
            name,email,GRID,Work
        })

        await newEmployee.save();


        res.status(201).json({success:true,message:"Employee added successfully",newEmployee})

    }catch(error){
        next(new httpError(error.message,500));
    }

}

export default add;