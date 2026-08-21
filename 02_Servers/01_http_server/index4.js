


import http from "http"


const server = http.createServer((req,res)=>{

res.end("Server Home page");

})

const port = 1000;

server.listen(port,(error)=>{

    if(error){
        console.log(error)
        return;
    }

    else{
        console.log("server is running",`${port}`);
    }

})
