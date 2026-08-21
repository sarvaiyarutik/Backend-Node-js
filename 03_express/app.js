import express from "express";


const app = express();

app.get("/",(req,res)=>{

    res.send("My message is send your gmail")

})

const port = 2000;

app.listen(port,(error)=>{

    if(error){
      return console.log(error)
    }

    console.log(`my server running on port ${port}`)

})