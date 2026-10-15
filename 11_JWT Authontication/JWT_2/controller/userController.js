
import userModel from "../model/userModel.js";
import httpError from "../middleware/httpError.js";

const add = async(req,res,next)=>{

    try{

        const {name,email,password} = req.body;

        const newUSer = await userModel.create({

           name,email,password 
        })

        res.status(201).json({success:true,message:"user data added successful",newUSer})

    }catch(error){
        return next(new httpError(error.message))
    }

}

export default {add};