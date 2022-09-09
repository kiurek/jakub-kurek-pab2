import express from "express";
import restauracjaController from "../controllers/restauracja.controller";

const router = express.Router();

router.post("/create", restauracjaController.createRestauracja);
router.get("/get/:restauracjaId", restauracjaController.readRestauracja);
router.get("/get/", restauracjaController.readAllRestauracja);
router.patch("/update/:restauracjaId", restauracjaController.updateRestauracja);
router.delete(
  "/delete/:restauracjaId",
  restauracjaController.deleteRestauracja
);

export = router;
