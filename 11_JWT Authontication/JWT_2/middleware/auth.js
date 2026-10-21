import httpError from "./httpError.js"
import jwt from "jsonwebtoken";
import user from "../model/userModel.js"


const auth = async(req,res,next)=>{

    try {

        const authHeader = req.header("Authorization")

        console.log("auth",authHeader);

        if(!authHeader){
            return next(new httpError("auth header is required",400))
        }

        const token = authHeader.replace("Bearer ","");

        console.log("token",token);

        const decode = jwt.verify(token,process.env.JWT_SECRET);

        console.log("decode",decode);

        const User = await user.findOne({_id:decode._id,"tokens.token":token,

        })

        console.log("user",User)

        if(!User){
            return next(new httpError("unauthorize access",401));
        }

        req.user = user;
        req.token = token;

        next();

        
    } catch (error) {

        return next(new httpError(error.message))
        
    }

}

export default auth;