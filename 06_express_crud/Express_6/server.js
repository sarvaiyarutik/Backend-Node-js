
import express from "express";
import httpError from "./middleware/httpError.js";

const app = express();

app.use(express.json());

   const taskList = [
    {
        id: 1,
        task: "Learn Node.js",
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

    res.json("express crud")

})

app.get("/taskList",(req,res,next)=>{

    if(taskList.length === 0){

        return res.status(200).json({message:"no data available"})

    }

    res.status(200).json({message:"Data added successfully",taskList})

})

app.get("/:taskList",(req,res,next)=>{

    try{

        const {id} = req.params;

        const task = taskList.find((f)=>f.id === Number(id))

        if(task === undefined){

        return res.status(200).json({message:"no task data available"})

        }
       res.status(200).json({message:"id visible",task})


    } catch(error){
            return next(new HttpError("Request not found"));

    }

})



const port = 5000;

app.listen(port,(error)=>{

    if(error){
        console.log(error.message)
    }

    console.log(`server running on port ${port}`)

})