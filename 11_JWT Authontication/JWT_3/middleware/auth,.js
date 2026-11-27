import User from "../model/userData.js";
import jwt from "jsonwebtoken";


const auth = async(req,res,next)=>{

    try {
        
        const authHeader = req.header("Authorization");

       console.log("auth Header",authHeader);

       if(!authHeader){
                        return next(new httpError("auth header is required",400))

       }

       const token = authHeader.replace("Bearer ","")
                   console.log("token",token);

                   const decode = jwt.verify(token,process.env.JWT_SECRET);

                   console.log("decode",decode)

                   const user = await User.findOne({_id:decode._id,"tokens.token":token,})

                     if(!userF){

              return  next(new httpError("unauthorize access",401))

            }

            req.user = user;
            req.token = token;

            next();



    } catch (error) {
                    return next(new httpError(error.message))

    }


}

export default auth;