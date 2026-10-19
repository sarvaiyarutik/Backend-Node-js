
import user from "../model/userModel.js";
import httpError from "./httpError.js";
import jwt from "jsonwebtoken";

const auth = async(req,res,next)=>{

    try {

        const  authHeader = req.header("Authorization");

        if(!authHeader){

            return next(new httpError("auth header is required",400))

        }

        const token = authHeader.replace("Bearer")
        
    } catch (error) {
        return next(new httpError(error.message))
    }

}