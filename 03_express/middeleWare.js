


// import express from "express"

// const app = express();

// app.get("/",(req,res)=>{

//     res.send("my server running");

// })


// app.get("/about",(req,res)=>{

//     res.json({page:"this is my about section"})

// })

// // middleware

// app.use("/json",(req,res,next)=>{

//     res.json({page:"this is a json format"})

// })


// const person = [

//     {
//         name : "Rutik",
//         age : 20,
//         language:"English",
//         roll:12
//     },
    
//     {
//         name : "Tushal",
//         age : 19,
//         language:"Gujarati",
//         sub:"hindi"
//     }

// ]


// app.use("/person",(req,res,next)=>{

//     res.json(person);

// })



// const port = 2000;

// app.listen(port,(err)=>{

//     if(err){
//         console.log(err)

//         return;
//     }

//     console.log(`server running on port ${port}`)

// })




// import express from "express";


// const app = express();

// app.get("/",(req,res)=>{

//     res.send("Send your massage");

// })


//  app.get("/about",(req,res)=>{

//     res.json({page:"page not found"});

//  })

// //  middleware  

//  app.use("/json",(req,res,next)=>{

//     res.json({name:"rutik",Age:12,Roll:1})

//  })

// const port = 1000;

// app.listen(port,(err)=>{

//     if(err){
//         console.log(err)
//     }

//     console.log(`server running on port ${port}`);

// })




import express from "express";


const app = express();

app.get("/",(req,res)=>{

    res.send("my server smg is send your profile")

})

app.get("/about",(req,res)=>{

    res.json({name:"john",age:12})

})


const person = [
  {
    "id": 1,
    "name": "Rutik",
    "age": 21,
    "email": "rutik@gmail.com"
  },
  {
    "id": 2,
    "name": "Rahul",
    "age": 22,
    "email": "rahul@gmail.com"
  },
  {
    "id": 3,
    "name": "Amit",
    "age": 20,
    "email": "amit@gmail.com"
  },
  {
    "id": 4,
    "name": "Jay",
    "age": 23,
    "email": "jay@gmail.com"
  },
  {
    "id": 5,
    "name": "Harsh",
    "age": 21,
    "email": "harsh@gmail.com"
  }
]



app.use("/person",(req,res)=>{

    res.json(person);

})



const port = 1000;

app.listen(port,(err)=>{

    if(err){
        console.log(err)
    }

    console.log(`my server running on port ${port}`)
})









