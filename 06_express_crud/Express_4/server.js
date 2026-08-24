

import express from "express";
import httpError from "./middleware/httpError.js";

const app = express();

const tasksList = [
    {
        id: 1,
        task: "Learn JavaScript",
        description: "Practice arrays, objects, functions, and DOM."
    },
    {
        id: 2,
        task: "Learn Node.js",
        description: "Understand modules, file system, and servers."
    },
    {
        id: 3,
        task: "Learn Express.js",
        description: "Practice routes, middleware, and CRUD operations."
    },
    {
        id: 4,
        task: "Build a Project",
        description: "Create a simple Task Management application."
    }
];

app.get("/",(req,res)=>{

    res.json({message:"Express Crud"});

})

app.get("/taskList",(req,res)=>{

    if(tasksList.length === 0){

        return res.status(200).json({message:"no task available"})

    }

    res.status(200).json({message:"data added successfully",tasksList})

})

app.use((req,res,next)=>{

    return next(new httpError("Request not found"));

})

app.use((error,req,res,next)=>{

    if(res.headersSent){
     
        return next(error)
    }

    res.status(error.statusCode || 500).json({message : error.message || "Internal Server error "});

})


const port = 3000;

app.listen(port,(err)=>{

    if(err){
        return console.log(err);
    }

    console.log(`Server running on port ${port}`); 

})