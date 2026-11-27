import express from "express"
import jwt from "jsonwebtoken"
import User from "../model/dataModel.js"
const auth = async(req,res,next)=>{


    try {
        
        const authHeader =  req.header("Authorization");

        console.log("auth header",authHeader);

        const token = authHeader.replace("Bearer ","");
                    console.log("token",token);

      const decode = jwt.verify(token,process.env.JWT_SECRET);

       console.log("decode",decode);

       const userF = await User.findOne({
        _id:decode._id,
        "tokens.token":token,

       });

       const userById = await User.findById(decode._id);

       console.log("User by ID:", userById);


       console.log("Token Matched :",userById?.tokens.some(t => t.token === token))

       if(!userF){
                      return  next(new httpError("unauthorize access",401))

       }
       req.userF = userF;
       req.token = token;

       next();

    } catch (error) {
                    return next(new httpError(error.message))

    }

}

    export default auth;