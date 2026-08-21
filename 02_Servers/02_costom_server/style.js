
import http from "http"


const server = http.createServer((req,res)=>{

    res.writeHead(200,{"content-type" : "text/html"});

    res.end("<h1>local host server is in html</h1>")

})


const port = 2000;

server.listen(port,(error)=>{

    if(error){
        console.log(error.massages)
    }

    console.log(`Port server is running now ${port}`)
})



