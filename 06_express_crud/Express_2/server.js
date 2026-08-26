import express from "express";
import HttpError from "./middleware/HttpError.js";

const app = express();

app.use(express.json());

const students = [
  {
    id: 1,
    name: "Rutik",
    language: "JavaScript",
  },
  {
    id: 2,
    name: "Rahul",
    language: "Java",
  },
  {
    id: 3,
    name: "Amit",
    language: "Python",
  },
];

console.log(students);

app.get("/", (req, res) => {
  return res.json({ message: "Express Crud" });
});

// read data

app.get("/students", (req, res, next) => {

  if (students.length === 0) {
    return res.status(200).json({ message: "No task available" });
  }

  res.status(200).json({ message: "Task added successfully", students });
});

app.get("/students/:id", (req, res,next) => {
  try {
    const { id } = req.params;

    const student = students.find((s) => s.id === Number(id));

    if (!student) {
      return res.status(200).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student id visible", student });
  } catch (err) {
    return next(new HttpError("Request not Found"));
  }
});

// post student in add

app.post("/students/add", (req, res, next) => {


    try{

        const {name,language} = req.body;

        if(name === undefined || language === undefined){
 
            return next(new HttpError("task of description are data required"))

        }

       const newStudent = {

        id:new Date().getTime(),
        name,
        language
       }

      students.push(newStudent);

       res.status(200).json({success:true,message:"new student added successfully",newStudent})


    }catch(err){
        return next(new HttpError("Request not found"));
    }

});


// Delete Data 

app.delete("/studentsDelete/:id",(req,res,next)=>{

  try{

    const { id } = req.params;

    const deleteStudent = students.findIndex((s)=>s.id === Number(id));

    if(deleteStudent === -1){

      return next(new HttpError("student not found ",400));

    }

    students.splice(deleteStudent,1);

    res.status(200).json({success:true,message:"Student deleted successfully",students});

  }catch(err){

    return next(new HttpError("request not found"));

  }


})

// update data for Patch

app.patch("/StudentUpdate/:id",(req,res,next)=>{

  try{

    const { id } = req.params

    const {name,language} = req.body;

    const updateStudent = students.find((s)=>s.id === Number(id));

    if(updateStudent === undefined){

      return next(new HttpError("Student not found with id update",404));
        
    }
    if(name){

      updateStudent.name = name;

    }
    if(language){

      updateStudent.language = language;

    }

    if(name === undefined && language === undefined){

      return next(new HttpError("name and language not require",updateStudent));

    }

    return res.status(200).json({success:true,message:"Student update successfully",updateStudent});


  }catch(err){

    return next(new HttpError("Request not found"))
  }

});


// put update data 

app.put("/StudentPut/:id",(req,res,next)=>{

  try{

    const { id } = req.params;

    const { name , language } = req.body;

    const index = students.findIndex((s)=>s.id === Number(id));

    if(index === -1){

       return next(new HttpError("student data with id not found")); 

    }

    students[index] = {
      ...students[index],
      id:Number(id),
      name:name,
      language:language,
    }

    res.status(200).json({success:true,message:"Students data update successfully",index:students[index]})

  }catch(err){

    return next(new HttpError("Task not found"))

  }

})


// undefine middleware

app.use((req, res, next) => {
  return next(new HttpError("Request not Found"));
});

// centralize error handling

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res
    .status(error.statusCode || 500)
    .json({ message: error.message || "Internal server error" });
});

const port = 5000;

app.listen(port, (err) => {
  if (err) {
    return console.log(err.message);
  }

  console.log(`server running on port ${port}`);
});
