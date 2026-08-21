

import express from "express";

const app = express();

app.use(express.urlencoded({ extended : true}));

app.set("view engine", "ejs");

let  EmployeeList = [

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

    res.render("index",{EmployeeList})

});

app.get("/add",(req,res)=>{
    res.render("add")
})


app.post("/add",(req,res)=>{

    const {name} = req.body;    

    const newEmployee={
        id:new Date().getTime(),
        name,
    }

    EmployeeList.push(newEmployee);

    res.redirect("/")
})


app.get("/delete/:id",(req,res)=>{

    const { id } = req.params

    const employee = EmployeeList.find((e)=>e.id === Number(id));

    if(!employee){

return res.json({ message: "Employee not found" });    }

    EmployeeList = EmployeeList.filter((e)=>e.id !== employee.id);

    res.redirect("/")

})

app.get("/edit/:id",(req,res)=>{

    const { id } = req.params;

    const employee = EmployeeList.find((e)=>e.id === Number(id))


    console.log("employee",employee)


    if(!employee){

        return res.json({massage:"Employee not found"});


    }

    res.render("edit",{employee});


})


app.post("/edit/:id",(req,res)=>{


    const { id } = req.params;

    const employee = EmployeeList.find((e)=>e.id === Number(id));

    if(!employee){
        return res.json({massage:"Employee not found"})
    }

    const { name } = req.body

    employee.name = name;

    res.redirect("/")

})



const port = 1000;

app.listen(port,(err)=>{

    if(err){
        console.log(err)
    }

    console.log(`Server Running on port ${port}`)

})