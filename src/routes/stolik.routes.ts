import express from "express";
import stolikController from "../controllers/stolik.controller";

const router = express.Router();

router.post("/create", stolikController.createStolik);
router.get("/get/:stolikId", stolikController.readStolik);
router.get("/wolne", stolikController.readWolneStoliki);
router.get("/wolne/:iloscOsob", stolikController.readWolneStolikiLiczbaOsob);
router.get("/get/", stolikController.readAll);
router.patch("/update/:stolikId", stolikController.updateStolik);
router.delete("/delete/:stolikId", stolikController.deleteStolik);

export = router;
