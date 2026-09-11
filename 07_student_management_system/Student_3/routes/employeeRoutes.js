

import express from "express";
import employeeController from "../controller/employeeController.js"


const Router = express.Router();

Router.post("/add",employeeController);
    
export default Router;