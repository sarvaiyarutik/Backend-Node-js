

import express from "express";
import httpError from "./middleware/httpError.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config({});

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{

    res.json("hello from server");

})
 
const port = 1000;


async function startServer(){


    try{

        const connect = connectDB();


        if(!connect){
            throw new Error("Failed to connect DB");
        }

        app.listen(port,(error)=>{

            if(error){
              return  console.log(error.message)
            }
            console.log(`server running on port ${port}`)

        })

    }catch(error){

        console.log(error.message)

        
    }

}

startServer();