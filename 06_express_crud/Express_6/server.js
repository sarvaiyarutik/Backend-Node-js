

import express from "express";
import httpError from "./middleware/httpError.js";

const app = express();

const studentList = [

     {
        id:1,
        name:"rutik",
        age:19,
        language:"English"
     },
          {
            id:2,
        name:"vraj",
        age:17,
        language:"Hindi"
     }
]


app.get("/",(req,res)=>{

    res.json("Express Crud");

})

app.get("/studentList",(req,res,next)=>{

    if(studentList.length === 0){

        return  res.status(200).json({message:"no task available"});
    }

    res.status(200).json({message:"data added successfully",studentList});
})


app.get("/studentList/:id",(req,res,next)=>{

    try{

        const {id} = req.params

        const student = studentList.find((s)=>s.id === Number(id));

        if(student === undefined){
            return next(new httpError("task or description data are required"))
        }

        const newStudent = {

            id:new Date().getTime()

        }

    }catch(error){

             console.log(error.message);

    }

})

// undefine  middleware 

app.use((req,res,next)=>{


    return next(new httpError("Request not found"));

})

app.use((error,req,res,next)=>{

    if(res.headersSent){

       return  next(error)

    }

    return res.status(error.statusCode || 500).json({message:error.message || "internal server error"});

})

const port = 1000;

app.listen(port,(err)=>{

    if(err){

        console.log(err);

    }

    console.log(`Server running on port ${port}`);

})