import express from "express";
import restauracjaController from "../controllers/restauracja.controller";
import rezerwacjaController from "../controllers/rezerwacja.controller";

const router = express.Router();

router.post("/create", rezerwacjaController.createRezerwacja);
router.get("/get/:rezerwacjaId", rezerwacjaController.readRezerwacja);
router.get("/get/", rezerwacjaController.readAll);
router.patch("/update/:rezerwacjaId", rezerwacjaController.updateRezerwacja);
router.delete("/delete/:rezerwacjaId", rezerwacjaController.deleteRezerwacja);

export = router;
