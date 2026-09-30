import express from "express";
import dotenv from "dotenv";
import httError from "./middleware/httpError.js";
import connectDB from "./config/db.js";

dotenv.config({path:"./.env"});

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{

    res.json("Event management system");

})

app.use((req,res,next)=>{

    return next(new httError("Request routes not found"))

})

app.use((error,req,res,next)=>{

    if(req.headersSent){
        return next(new httError(error))

    }

    return req.status(error.statusCode || 500).json({message:error.message || "internal server error"})

})

const port = process.env.;

async function startServer(){


    try{
        
        const connect = await connectDB();

        if(!connect){

            throw new Error("Failed to connect DB");
        }

        app.listen(port,(error)=>{

            if(error){
                console.log(error.message)
            }

            console.log(`server running on port ${port}`);
        })

    }catch(error){
        console.log(error.message)
    }

}

startServer();