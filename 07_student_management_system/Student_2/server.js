

import express from "express";
import httpError from "./middleware/httpError.js";
import connectDB from "./config/DB.js";


const app = express();

app.get("/",(req,res)=>{

    return res.json({massage:"Student management system"});

})

app.use((req,res,next)=>{

    return next(new httpError("request not found",404))
    
})


app.use((error,req,res,next)=>{

    if(res.headersSent){

        return next(new httpError(error.message));

    }

    return res.status(error.statusCode || 500).json({message:error.message || "internal server error"});

})

const port = 2000;


async function startServer() {
    
    try{

        const connect = await connectDB();

        if(!connect){
            throw new Error("failed to connect db")
        }


     app.listen(port,(err)=>{

       if(err){
   
           console.log(err)
        //    throw err;

        }
    console.log(`server running on port ${port}`);
    
})

    }catch(err){

        console.log(err.message);
     
    }
}

startServer();