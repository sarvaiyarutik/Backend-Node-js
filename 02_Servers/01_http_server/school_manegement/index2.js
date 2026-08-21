

import http from "http"

const server = http.createServer((req,res)=>{

    if(req.url === "/"){
        res.end("Home page");
    }
    else if(req.url === "/about"){
        res.end("About page");
    }
    else if(req.url === "/contact"){

        res.end("Contact Page");
    }
    else{
        res.end("404 page not found");
    }
});

server.listen(500,()=>{

    console.log("Server running on part 5000");
})