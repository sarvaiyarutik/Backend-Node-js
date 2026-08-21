

// import fs from "fs";

const fs = require("fs")

fs.writeFileSync("text.pdf","pdf create by me");

const data = fs.readFileSync("text.pdf");

console.log(data)