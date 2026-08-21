

import http from "http";

import fs from "fs"


const server = http.createServer((req,res)=>{

    fs.readFile("./script.html",(err,data)=>{

        if(err){

             res.writeHead(404);
            res.end("File not found");

            return;


        }

        else{

             res.writeHead(200,{"content-type":"text/html"});
       
            res.end(data)

        }

    })

})


const port = 1000;

server.listen(port,(err)=>{

    if(err){
         console.log(err)
    }


    console.log(`server running on port ${port}`);

})