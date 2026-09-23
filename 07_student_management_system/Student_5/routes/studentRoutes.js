
import express from "express";
import studentController from "../controller/studentController.js";

const Router = express.Router();

Router.post("/add",studentController.add);

export default Router;
