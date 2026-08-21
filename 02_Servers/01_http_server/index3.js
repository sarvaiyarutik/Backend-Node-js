

import http from "http"


const server = http.createServer((req,res)=>{

    res.end("Server page is running");

})

const port = 5000;

server.listen(port,(err)=>{

    if(err){

        console.log(err);

        return;
    }

    console.log("Server is start",`${port}`)
}) 
