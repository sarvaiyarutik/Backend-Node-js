
import express from "express";
import httpError from "./middleware/httpError.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js"

dotenv.config();

console.log("MONGO_URL:", !!process.env.MONGO_URL);

const app = express();

app.use(express.json());

app.use("/employee",studentRoutes)



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

async function startServer() {

    try{

        const connect =await connectDB();

        if(!connect){
          throw new Error("failed to connect DB")
        }

        app.listen(port,()=>{
            return console.log(`server running on port ${port}`);
        })
    }catch(error){
        console.log(error.message)
    }
    
}

startServer();