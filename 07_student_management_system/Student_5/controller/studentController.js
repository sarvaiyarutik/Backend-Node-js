
import httpError from "../middleware/httpError.js";
import Student from "../model/studentData.js";

const add = async (req,res,next)=>{

    try{
        const {name,email,GRID} = req.body;

        const newStudent = await new Student({
            name,
            email,
            GRID
        });

        await newStudent.save();

        res.status(200).json({success:true, message:"student added successfully",newStudent});
    }catch(error){
      next(new httpError(error.message,500));
    }

}

export default {add};
