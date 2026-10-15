import httpError from "../middleware/httpError.js";
import userModel from "../model/userData.js";

const add  = async (req,res,next)=>{

    try{

        const {name,email,password} = req.body;

        const newUser = await userModel.create({

            name,
            email,
            password

        })

        res.status(201).json({success:true,message:"user data added successfully",newUser})

    }catch(error){
        return next(new httpError(error.message))
    }

}

export default {add};