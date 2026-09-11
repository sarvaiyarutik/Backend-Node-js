

import express from "express";

import studentController from "../controller/studentController.js"

const Routes = express.Router();

Routes.post("/add",studentController);

export default Routes;