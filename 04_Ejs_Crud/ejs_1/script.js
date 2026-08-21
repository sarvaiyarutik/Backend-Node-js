

import express from "express";

const app = express();

app.use(express.urlencoded({ extended : true}));

app.set("view engine", "ejs");

let  StudentList = [

    {
        name:"john",
        id:1
    },

    {
        name:"jonson",
        id:2
    }

]


app.get("/",(req,res)=>{

    res.render("index",{StudentList})

});

app.get("/add",(req,res)=>{
    res.render("add")
})


app.post("/add",(req,res)=>{

    const {name} = req.body;

    const newStudent={
        id:new Date().getTime(),
        name,
    }

    StudentList.push(newStudent);

    res.redirect("/")
})


app.get("/delete/:id",(req,res)=>{

    const {id} = req.params

    const student = StudentList.find((s)=>s.id === Number(id));

    if(!student){
       return res.json({message:"Student not found"})
    }

    StudentList = StudentList.filter((s)=>s.id !== student.id);

    res.redirect("/");

})

app.get("/edit/:id",(req,res)=>{

    const {id} = req.params
    
    const student = StudentList.find((s)=>s.id === Number(id));

    console.log("Student",student);

    if(!student){

        return res.json({massage:"Student not found"})
    }

    res.render("edit",{employee});

})

app.post("/edit/:id",(req,res)=>{

    const {id} = req.params

    const student = StudentList.find((s)=>s.id === Number(id));

    if(!student){

        return res.json({massage:"Student not found"})

    }

    const { name } = req.body

    student.name = name;

    res.redirect("/");

})


const port = 1000;

app.listen(port,(err)=>{

    if(err){
        console.log(err)
    }

    console.log(`Server Running on port ${port}`)

})