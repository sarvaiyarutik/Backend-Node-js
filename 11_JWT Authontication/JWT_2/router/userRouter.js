
import express from "express";
import userController from "../controller/userController.js";
import auth from "../middleware/auth.js"

const router = express.Router();

router.post("/add",userController.add)
router.get("/getAll",auth,userController.getAll);
router.post("/login",userController.login)

export default router;