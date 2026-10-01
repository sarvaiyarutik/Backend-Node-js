import express from "express";
import eventController from "../controller/eventController.js";
import uploads from "../middleware/upload.js";

const router = express.Router();

router.post("/add",uploads.fields([
    {name:"eventIMG",maxCount:4},
    {name:"eventPoster",maxCount:1},
    {name:"eventBanner",maxCount:3},
    {name:"eventSpeaker",maxCount:5},
    {name:"eventDocument",maxCount:10}
]),eventController.add);

export default router;

