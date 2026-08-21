

import http from "http"


const server = http.createServer((req,res)=>{

    res.end("hello mera server ke se ho")
})


const port = 5000;

server.listen(port,(err)=>{

    if(err){
        console.log(err)

        return;
    }

    console.log("server is running",`${port}`);


});