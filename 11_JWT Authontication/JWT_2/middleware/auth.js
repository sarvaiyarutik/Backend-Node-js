
import user from "../model/userModel.js";
import httpError from "./httpError.js";
import jwt from "jsonwebtoken";

const auth = async(req,res,next)=>{

    try {

        const authHeader = req.header("Authorization");

        if(!authHeader){

            return next(new httpError("auth header is required",400))
        }

        const token = authHeader.replace("Bearer ","");


        const decode = jwt.verify(token,process.env.JWT_SECRET);

        const User = await user.findOne({
            _id:decode._id,"tokens.token":token
        })

        console.log("user",User);

        if(!User){
            return next(new httpError("unauthorize access",401));
        }

        req.user = user;
        req.token = token
        
        
    } catch (error) {
        return next(new httpError(error.message))
    }

}

export default  auth;