import express from "express";
import dishController from "../controllers/dish.controller";

const router = express.Router();

router.post("/create", dishController.createDanie);
router.get("/get/:danieId", dishController.readDanie);
router.get("/get/", dishController.readAll);
router.patch("/update/:danieId", dishController.updateDanie);
router.delete("/delete/:danieId", dishController.deleteDanie);

export = router;
