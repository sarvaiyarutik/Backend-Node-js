
import express from "express";
import httpError from "./middleware/httpError.js";
import studentRouter from "./routes/studentRoutes.js"
import connectDB from "./config/db.js"


const app = express();


app.use(express.json());
app.use("/student",studentRouter);

app.get("/",(req,res)=>{

    res.json("student management system");

})

app.use((req,res,next)=>{

    return next(new httpError("request not found"))

})

app.use((error,req,res,next)=>{

    if(res.headersSent){
        return next(error)
    }

    return res.status(error.statusCode || 500).json({message:error.message || "internal server error"})

})

const port = 1000;

async function serverStart(){

    try{

        const connect = await connectDB();

        if(!connect){

            throw new Error("Failed to connect DB")

        }

        app.listen(port,()=>{
   
    console.log(`server running on port ${port}`);
})

    }catch(error){

        console.log(error.message)
    }

}

serverStart();
