
    import express from "express";
    import connectDB from "./config/db.js"
    import httpError from "./middleware/httpError.js";
    import studentRouter from "./Routes/studentRoutes.js";


    const app = express()

    app.use(express.json());

    app.use("/student",studentRouter);

    app.get("/",(req,res)=>{

        res.json({message:"Student management system"});

    })

    app.use((req,res,next)=>{

        return next(new httpError("Request not found",404))

    })

    app.use((error,req,res,next)=>{

        if(res.headersSent){

        return next(error);

        }

        return  res.status(error.statusCode || 500).json({message:error.message || "Internal server error"});

    })

    const port = 3000;

    async function startServer(){

        try{

    const correct = await connectDB();


    if(!correct){

        throw new Error("failed to connect db");
    }

    app.listen(port,(error)=>{


        console.log(`server running on port ${port}`);

        })

        }catch(error){

        return console.log(error.message);
        }
    }
    startServer();