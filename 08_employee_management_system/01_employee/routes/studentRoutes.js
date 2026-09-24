
    import express from "express";
    import studentController from "../controller/employee_controller.js";

    const routes = express.Router();

    routes.post("/add",studentController.add);
    routes.get("/employeeDataShow",studentController.employeeDataShow);
    routes.delete("/deleteEmployeeId/:id",studentController.deleteEmployeeId);
    routes.get("/employeeGetAllData/:id",studentController.employeeGetAllData);

    export default routes;

