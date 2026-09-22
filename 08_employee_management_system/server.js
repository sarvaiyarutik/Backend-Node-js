
import express from "express";
import httpError from "./middleware/httpError.js";

const app = express();

app.use(express.json());



app.get("/",(req,res)=>{
    res.json({message:"hello from server"});
})

app.use((req,res,next)=>{

    return next(new httpError("request routes not found",404))

})

app.use((error,req,res,next)=>{

    if(res.headersSent){
        return next(new httpError(error));
    }

    return res.status(error.statusCode || 500).json({message:error.message || "internal server error"});
})


const port = 5000;
