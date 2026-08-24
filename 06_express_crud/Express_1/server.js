

import express from "express";

import HttpError from "./middleware/HttpError.js"

const app = express();




    const taskList = [
    {
        id: 1,
        tack: "Learn Node.js",
        description: "Understand Node.js modules, file system, and HTTP server."
    },
    {
        id: 2,
        task: "Learn Express.js",
        description: "Learn routes, middleware, request, and response handling."
    },
    {
        id: 3,
        task: "Build CRUD API",
        description: "Create APIs for adding, viewing, updating, and deleting data."
    }
];


app.get("/",(req,res)=>{

    res.json({message:"Express Crud operation"})

})

// read

app.get("/taskList",(req,res,next)=>{

    if(taskList.length === 0){

        return res.status(200).json({message:"no task data available"})

    }

    res.status(200).json({message:"Data added successfully",taskList})

})


app.get("/taskList/:id",(req,res,next)=>{

    try{

        const {id} = req.params

        const task = taskList.find((t)=>t.id === Number(id));

        if(!task){

        return res.status(200).json({message:"no task data available"})
        }

        res.status(200).json({message:"id visible",task})

    }
    catch(error){
            return next(new HttpError("Request not found"));

    }

})

// undefine middleware
    
app.use((req,res,next)=>{

    return next(new HttpError("Request not found"));

})

app.use((error,req,res,next)=>{

    if(res.headersSent){

        return next(error)
    }

    res.status(error.statusCode || 500).json({message:error.message || " internal server error "});
})


const port = 1000;

app.listen(port,(err)=>{

    if(err){

        return console.log(err);
    }

    console.log(`server running on port ${port}`);

})