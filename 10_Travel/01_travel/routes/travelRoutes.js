import express from "express";
import travelController from "../controller/travelController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/add",upload.single("travel_img"),travelController.add);

export default router;