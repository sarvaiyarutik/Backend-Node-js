

import express from "express";


const app = express();

app.set("view engine","ejs");
app.use(express.urlencoded({extended : true}));
app.use(express.static("public"));

let MoviesList = [

    {
        id:1,
        name:"Dhurnder"
    },       
    {
      id:2,
      name:"hit3"
    },

    {
        id:3,
        name:"saiyara"
    }
]

app.get("/",(req,res)=>{

    res.render("index",{ MoviesList })

})

app.get("/add",(req,res)=>{

    res.render("add");
})

app.post("/add",(req,res)=>{

    const { name } = req.body;


    const newMovies = {

        id:new Date().getTime(),
        name
    }
    
    MoviesList.push(newMovies);

    res.redirect("/");
})

app.get("/delete/:id",(req,res)=>{

    const { id } = req.params

    const movie = MoviesList.find((m)=>m.id === Number(id));

    if(!movie){

        return res.json({message:"movie not found"})

    }


    MoviesList = MoviesList.filter((m)=>m.id !== movie.id);

    res.redirect("/");


})

app.get("/edit/:id",(req,res)=>{

    const { id } = req.params

    const movie = MoviesList.find((m)=>m.id === Number(id));


    if(!movie){

        return res.json({message:"movie not found"});
    }

    res.render("edit",{movie});


})

app.post("/edit/:id",(req,res)=>{

    const { id } = req.params

    const movie = MoviesList.find((m)=>m.id === Number(id));

    if(!movie){

        return res.json({message:"Student not found"});

    }

    const { name } = req.body;

    movie.name = name;

    res.redirect("/");


})


app.get("/add")

const port = 2000;

app.listen(port,(err)=>{

    if(err){
        console.log(err)
    }

    console.log(`server running on port ${port}`)

})