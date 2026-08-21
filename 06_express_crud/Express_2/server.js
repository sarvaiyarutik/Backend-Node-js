

    import express from "express";
    import HttpError from "./middleware/HttpError.js"

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

app.get("/taskList",(req,res,next)=>{

    if(tasksList.length === 0){

       return res.status(200).json({message:"No task available"})

    }

    res.status(200).json({message:"Task added successfully",tasksList})
     

})


    app.get("/",(req,res)=>{

        return res.json({message:"Express Crud"});

    })


    // undefine middleware 


    app.use((req,res,next)=>{

    return next(new HttpError("Request not Found"));

    })

    // centralize error handling

    app.use((error,req,res,next)=>{

        if(res.headersSent){

            return next(error);
        }

        res.status(error.statusCode || 500).json({message:error.message || "Internal server error"})

    });



    const port = 5000;

    app.listen(port,(err)=>{

        if(err){

            return console.log(err.message);

        }

        console.log(`server running on port ${port}`);

    })