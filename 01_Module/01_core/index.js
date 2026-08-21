

const fs = require("fs")

fs.writeFileSync("file.txt","file create by me");

const data = fs.readFileSync("file.txt");

console.log("file data",data);

