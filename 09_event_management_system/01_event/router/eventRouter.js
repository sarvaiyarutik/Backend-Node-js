
import express from "express";
import eventController from "../controller/eventController.js"
import upload from "../middleware/upload.js"
import uploads from "../middleware/upload.js";

const router = express.Router();

router.post("/add",upload.fields([

  {name:"EventImg",maxCount:2},
  {name:"EventPoster",maxCount:1},
  {name:"EventBanner",maxCount:3},
  {name:"EventSpeakers",maxCount:4},
  {name:"EventDocument",maxCount:10}

]),eventController.add);

router.get("/EventGetAll",eventController.EventGetAll);

router.delete("/deleteEvent/:id",eventController.deleteEvent);
router.get("/EventGetById/:id",eventController.EventGetById);
router.patch("/:id",uploads.fields([
  {name:"EventImg",maxCount:4},
]),eventController.updateManually)                 


export default router;