
import httpError from "../middleware/httpError.js"

const add = async (req,res,next)=>{

    try{

        const {name,email,GRID,Course} = req.body;

        const newStudent = await new Student({

            name,
            email,
            GRID,
            Course

        })

        await newStudent.save();

        res.status(201).json({success:true,message:"Student data added successfully",newStudent})

    }catch(error){

      next(new httpError(error.message,500))

    }

}

export default add;