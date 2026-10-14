
import express from "express";
import httpError from "./middleware/httpError.js"
import dotenv from "dotenv";

dotenv.config({path:"./.env"});

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.json("travel project")
})

app.use((req,res,next)=>{

    return next(new httpError("request routes not found"));

})



app.use((error,req,res,next)=>{

    if(res.headersSent){
        return next(new httpError(error.message))
    }

    return res.status(error.statusCode || 500).json({message:error.message || "internal server error"});

})

const port = process.env.PORT || 5000;