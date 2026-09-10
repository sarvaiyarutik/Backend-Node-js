
import express from "express";

import httpError from "./middleware/httpError.js";



import connectDB from "./config/db.js";



const app = express();

app.get("/",(req,res)=>{

    res.json("employee management system");

})

app.use((req,res,next)=>{

    return next(new httpError("Request not found",404));

})

app.use((error,req,res,next)=>{

    if(res.headersSent){

        return next(error);

    }

    res.status(error.statusCode || 500).json({message:error.message || "Internal Server Error"})

})


const port = 5000;

async function startServer() {

    try{
        const connect = await connectDB();

        if(!connect){
            throw new Error("Failed to connect DB");
        }

        app.listen(port,(error)=>{

            if(error){

                console.log(error);

            }

            console.log(`server running on port ${port}`);

        })


    }catch(error){
        console.log(error)
    }
    
}

startServer()