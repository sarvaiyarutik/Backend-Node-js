

import express from "express";
import httpError from "./middleware/httpError.js";

const app = express();

app.use(express.json())

const companyList = [
  {
    id: 1,
    name: "TCS",
    working: "Software Development"
  },
  {
    id: 2,
    name: "Infosys",
    working: "Web Development"
  },
  {
    id: 3,
    name: "Wipro",
    working: "Cloud Computing"
  },
  {
    id: 4,
    name: "Google",
    working: "Software Engineering"
  },
  {
    id: 5,
    name: "Microsoft",
    working: "Application Development"
  },
  {
    id: 6,
    name: "Amazon",
    working: "Cloud Services"
  },
  {
    id: 7,
    name: "Meta",
    working: "Social Media Technology"
  },
  {
    id: 8,
    name: "IBM",
    working: "Artificial Intelligence"
  }
];

app.get("/",(req,res)=>{

    res.json({message:"Express Crud"});

})

app.get("/companyList",(req,res)=>{

    if(companyList.length === 0){

        return res.status(200).json({message:"no company detail available"})

    }

    res.status(200).json({message:"data added successfully",companyList})

})

app.get("/companyList/:id",(req,res,next)=>{


    try{

        const { id } = req.params;

        const company = companyList.find((c)=>c.id === Number(id));

    if(company === undefined){
 return res.status(200).json({success:true,message:"company not available"});

    }

    res.status(200).json({message:"id is visible",company});
       
    }catch(err){
        return next(new httpError("request not found"));
    }
})


app.post("/company/add",(req,res,next)=>{


  try{

    const { name , working } = req.body

    if(name === undefined || working === undefined){

      return next(new httpError("task and description data is required", 400));

    }

    const newCompany = {

      id:new Date().getTime(),
      name:name,
      working:working,

    }

    companyList.push(newCompany);

    res.status(201).json({success:true,message:"detail added successfully",newCompany})

  }catch(err){

      return next(new httpError("request not found"));

  }

})

app.patch("/companyPatch/:id",(req,res,next)=>{


  try{

    const { name , working } = req.body;

    const { id } = req.params;

    const updateData = companyList.find((c)=>c.id === Number(id));

    if(updateData === undefined){

      return next(new httpError("task not found with this id", 404))

    }

    if(name){

      updateData.name = name;
    }

    if(working){

      updateData.working = working;
    }

    if(name === undefined && working === undefined){

      return next(new httpError( "for updating task data task or description is required",
          400,))

    }

    return res.status(200).json({success:true,message:"company data update successfully",updateData})

  }catch(err){

     next(new httpError(err.message,500));
  }

})


app.put("/companyPut/:id",(req,res,next)=>{


  try{

    const { id } = req.params;

    const { name,working } = req.body;
    
    const index = companyList.findIndex((c)=>c.id === Number(id));

    if(index === -1){

      return next(new httpError("task with this id not found",404))

    }

    companyList[index] = {

      ...companyList[index],
      name:name || companyList[index].name,
      working:working || companyList[index].working

    }

     return res.status(200).json({
      success: true,
      message: "task data updated successfully",
      updateData:companyList[index],
    });



  }catch (error) {
     next(new httpError(error.message, 500));
  }


})

app.delete("/companyDelate/:id",(req,res)=>{

   try{

    const { id } = req.params;
 
    const index = companyList.findIndex((c)=>c.id === Number(id));

    if(index === -1){

            return next(new HttpError("task not found with this id", 404));
    }

    companyList.splice(index,1);

       return res
      .status(200)
      .json({ success: true, message: "task deleted successfully", companyList });

   }catch(err){

    next(new httpError(err.message,500)); 
   }

})


// undefine middleware

app.use((req,res,next)=>{

    return next(new httpError("Request not found"));

})

// centralize middleware

app.use((error,req,res,next)=>{

    if(res.headersSent){
     
        return next(error)
    }

    res.status(error.statusCode || 500).json({message : error.message || "Internal Server error "});

})


const port = 3000;

app.listen(port,(err)=>{

    if(err){
        return console.log(err);
    }

    console.log(`Server running on port ${port}`); 

})