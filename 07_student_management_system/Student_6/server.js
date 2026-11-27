import express from "express";
import connectDB from "./config/db.js"
import httpError from "./middleware/httpError.js"
import studentRouter from "./router/studentRouter.js"


const app = express();

app.use(express.json())

app.use("/student",studentRouter)

app.get("/",(req,res)=>{

    res.json({message:"hello from server"})

})


app.use((req,res,next)=>{

        return next(new httpError("request routes not found,404"))

})

app.use((error,req,res,next)=>{

    if(res.headersSent){
        return next(new httpError(error))
    }


    res.status(error.statusCode || 500).json({message:error.message || "internal server error"})

})

const port = 1000;

async function startServer() {

    try {

        const connect = await connectDB()

        if(!connect){
            throw new Error("connect db is failed")
        }

        app.listen(port,(error)=>{

            if(error){
                console.log(error.message)
            }

            console.log(`server running on port ${port}`)

        })
        
    } catch (error) {
        console.log(error.message)
    }
    
}

startServer();