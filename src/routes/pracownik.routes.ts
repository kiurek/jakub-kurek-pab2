import express from "express";
import pracownikControllers from "../controllers/pracownik.controllers";

const router = express.Router();

router.post("/create", pracownikControllers.createPracownik);
router.get("/get/:pracownikId", pracownikControllers.readPracownik);
router.get("/get/", pracownikControllers.readAll);
router.patch("/update/:pracownikId", pracownikControllers.updatePracownik);
router.delete("/delete/:pracownikId", pracownikControllers.deletePracownik);

export = router;
