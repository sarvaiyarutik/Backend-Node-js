

import express from "express";
import httpError from "./middleware/httpError.js"
const app = express();

app.use(express.json());


const EmployeeList = [
  {
    id: 1,
    name: "Rutik",
    work: "Full Stack Developer"
  },
  {
    id: 2,
    name: "Rahul",
    work: "Frontend Developer"
  },
  {
    id: 3,
    name: "Amit",
    work: "Backend Developer"
  },
  {
    id: 4,
    name: "Priya",
    work: "UI/UX Designer"
  },
  {
    id: 5,
    name: "Neha",
    work: "Software Tester"
  }
];

app.get("/",(req,res)=>{

    return res.json({message:"Express crud"});

})

app.get("/employeeList",(req,res)=>{

    if(EmployeeList.length === 0){

        return res.status(200).json({message:"no task available"});
    }

    res.status(200).json({message:"task added successfully",EmployeeList});

})

app.get("/employeeList/:id",(req,res,next)=>{


    try{

        const {id } = req.params;
 
        const employee = EmployeeList.find((e)=>e.id === Number(id));

        if(employee === undefined){

            return res.status(200).json({message:"employee not available"});
    
        }

        res.status(200).json({message:"employee id is visible",employee})

    }catch(err){
        return next(new httpError("Request not found"));
    }

})


// add employee data 
// post method 


app.post("/employee/add",(req,res,next)=>{


    try{

        const { name , work} = req.body;

        if(name === undefined || work === undefined){

            return next(new httpError("name and work are required"));


        }

        const newEmployee = {

            id:new Date().getTime(),
            name,
            work,

        }

        EmployeeList.push(newEmployee);

        res.status(200).json({success:true,message:"new employee added successfully",newEmployee});

    }catch(err){ 

        return next(new httpError("Employee not found",404));
    }


})



// patch data mens update date 

app.patch("/employeePatch/:id",(req,res,next)=>{

    try{

        const {id} = req.params;

        const { name , work} = req.body;

        const employeeUpdate = EmployeeList.find((e)=>e.id === Number(id));

        if(employeeUpdate === undefined){

            return next(new httpError("Employee not found",404));

        }

        if(name){

            employeeUpdate.name = name;
        }

        if(work){
            employeeUpdate.work = work;

        }

        if(name === undefined && work === undefined){

            return next(new httpError("name and work for required",400));

        }

        return res.status(200).json({success:true,message:"employee detail update successfully",employeeUpdate})




    }catch(error){

        return next(new httpError("Employee not found ",404));

    }



})


app.delete("/employeeDelete/:id",(req,res)=>{

    try{

        const { id } = req.params;

    const employeeDelete = EmployeeList.findIndex((e)=>e.id === Number(id));
    
    if(employeeDelete === -1){
    
        return next(new httpError("employee not found",404));
        
    }

    EmployeeList.splice(employeeDelete,1);

    
    return res
      .status(200)
      .json({ success: true, message: "task deleted successfully", EmployeeList });


    }catch(err){

        return next(new httpError("Request not found",404))

    }

})

app.put("/employeePut/:id",(req,res,next)=>{

    try{

        const { id } = req.params;

        const { name, work }=  req.body;

        const index = EmployeeList.find((e)=>e.id === Number(id));

        if( index === -1){

                   return next(new HttpError("student data with id not found")); 

        }

        EmployeeList[index] = {

            ...EmployeeList[index],
            id:Number(id),
            name:name,
            work:work
        }

            res.status(200).json({success:true,message:"Students data update successfully",index:EmployeeList[index]})


    }catch(err){

        return next(new httpError("Request not found"))
    }

})
console.log("TEST PUSH");


// Undefine Middleware

app.use((req,res,next)=>{

    return next(new httpError("Request not found"))

})

app.use((error,req,res,next)=>{

    if(res.headersSent){

        return next(error)

    }


    res.status(error.statusCode || 500).json({message:error.message || "Internal Server error "})

})


const port = 1000;

app.listen(port,(err)=>{

    if(err){

        return console.log(err)
    }

    console.log(`server running on port ${port}`)


})