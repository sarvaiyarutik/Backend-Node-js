import http from "http";

const server = http.createServer((req, res) => {

    if (req.url === "/home") {
        res.end("home page");
    }
    else if (req.url === "/about") {
        res.end("this is about page");
    }
    else {
        res.statusCode = 404;
        res.end("404 Page Not Found");
    }

});

const port = 5000;

server.listen(port, (error) => {

    if (error) {
        console.log(error);
        return;
    }

    console.log("Server is Running", port);

});