

import express from "express";


const app = express();

app.get("/",(req,res)=>{

    res.send("My Data send your profile")

})


const port = 3000;

app.listen(port,(error)=>{

    if(error){
        console.log(error)
    }

    console.log(`my server running on port ${port}`)
})