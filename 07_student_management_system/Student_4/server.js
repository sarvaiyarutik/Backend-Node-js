

import express from "express";
import mongoose from "mongoose";


const app = express()

app.get("/",(req,res)=>{

    res.json({message:"Student management system"});

})


const port = 3000;


async function  startServer() {
    
    try{
        const connect = mongoose();

        if(!connect){

            throw new Error("Failed to connect DB");

        }

        app.listen(port,(error)=>{

            if(error){

                console.log(error.message);

            }

            console.log(`server running on port ${port}`)

        })
    }catch(error){

        console.log(error.message);
    }

}
