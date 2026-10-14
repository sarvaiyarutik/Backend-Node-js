import express from "express";
import travelController from "../controller/travelController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/add",upload.single("travel_img"),travelController.add);
router.get("/getAll",travelController.getAll);
router.get("/:id",travelController.getByID)
router.delete("/:id",travelController.packageDelete)
router.patch("/:id",upload.single("travel_img"),travelController.updataPackage)

export default router;