import httpError from "../middleware/httpError.js";
import userData from "../model/User.js"
import jwt from "jsonwebtoken"


const add = async (req,res,next)=>{

  try {

    const {name,email,password} = req.body;

    const newUser = await userData.create({
        name,email,password
    })
   
            res.status(201).json({success:true,message:"user data added successfully",newUser})


    
  } catch (error) {
            return next(new httpError(error.message))

  }
    
}