import express from "express";
import studentController from "../controller/studentController.js";

const routes = express.Router();

routes.post("/add",studentController.add)
routes.get("/getAll",studentController.getAll)
routes.delete("/deleteAll",studentController.deleteAll)

routes.get("/:id",studentController.getById)
routes.delete("/:id",studentController.deleteById)

export default routes;