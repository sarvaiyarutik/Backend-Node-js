

import http from "http"


const server = http.createServer((req,res)=>{

    if(req.url === "/home"){

        return res.end("This is a backend home page")
    }

    else if(req.url === "/about"){

        return res.end("This is a backend about page")
    }

    else if(req.url === "/service"){

        return res.end("This is a backend service page");
    }

    else{

        res.writeHead(404);
        res.end("page not found")
    }

})


const port =2000;


server.listen(port,(err)=>{

    if(err){

        console.log(err)
    }
    
    console.log(`server is running in port ${port}`)

})

