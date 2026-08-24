

    import express from "express";
    import HttpError from "./middleware/HttpError.js"

    const app = express();

const students = [
    {
        id: 1,
        name: "Rutik",
        language: "JavaScript"
    },
    {
        id: 2,
        name: "Rahul",
        language: "Java"
    },
    {
        id: 3,
        name: "Amit",
        language: "Python"
    }
];


 console.log(students);


 
    app.get("/",(req,res)=>{

        return res.json({message:"Express Crud"});

    })

    // read data    

    app.get("/students",(req,res,next)=>{

    if(students.length === 0){

       return res.status(200).json({message:"No task available"})

    }

    res.status(200).json({message:"Task added successfully",students})
     

})


app.get("/students/:id",(req,res)=>{

    try{

        const {id} = req.params

        const student = students.find((s)=>s.id === Number(id));

        if(!student){

             return res.status(200).json({message:"Student not found"});
        }

        res.status(200).json({message:"Student id visible",student})

    }catch(err){

    return next(new HttpError("Request not Found"));

    }
    
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