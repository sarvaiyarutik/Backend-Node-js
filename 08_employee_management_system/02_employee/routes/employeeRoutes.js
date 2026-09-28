
import express from "express";
import employeeController from "../controller/employeeController.js"


const router = express.Router();

router.post("/add",employeeController.add);
router.get("/getEmployeeAll",employeeController.getEmployeeAll)
router.get("/getFindByIDEmployee/:id",employeeController.getFindByIDEmployee)

export default router;