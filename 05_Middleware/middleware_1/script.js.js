

import express from "express";
import helmet from "helmet";

const app = express();

app.get("/",(req,res)=>{

    res.json({message:"please check messages"})

});

// 1. application level middleware

app.use((req,res,next)=>{

    console.log("Application Middleware");

    next();
})


// 2. Router-level Middleware

const router = express.Router();

router.use((req,res,next)=>{
    console.log("Router Middleware");
    next();
});

router.get("/home",(req,res)=>{

    res.send("Home");
});

router.get("/about",(req,res)=>{

    res.send("About")
});

app.use("/user",router);


// 3. undefined routes handling

app.use((req,res)=>{

    res.send("requested route not found")
})


// 4. external middleware

// router.use(helmet());

// 5. centralize middleware


router.use((error,req,res,next)=>{

    if(res.headersSent){
        return next(error);
    }
    res.status(error.statusCode || 500).json(error.message || "internal server error")

})


const port = 2000;

app.listen(port,(err)=>{

    if(err){
        
        return console.log("error",err);

    }

    console.log(`server running on port ${port}`);

})