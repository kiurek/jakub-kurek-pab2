import express from "express";
import zamowienieController from "../controllers/zamowienie.controller";

const router = express.Router();

router.post("/create", zamowienieController.createZamowienie);
router.get("/get/:zamowienieId", zamowienieController.readZamowienie);
router.get("/get/", zamowienieController.readAll);
router.get("/stolik/:stolikId", zamowienieController.readStolikId);
router.get("/pracownik/:pracownikId", zamowienieController.readPracownikId);
router.patch("/update/:zamowienieId", zamowienieController.updateZamowienie);
router.delete("/delete/:zamowienieId", zamowienieController.deleteZamowienie);

export = router;
