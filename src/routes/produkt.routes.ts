import express from "express";
import produktController from "../controllers/produkt.controller";

const router = express.Router();

router.post("/create", produktController.createProdukt);
router.get("/get/:produktId", produktController.readProdukt);
router.get("/get/", produktController.readAll);
router.get("/shop/", produktController.readShopList);
router.get("/sort", produktController.readAllButSorted);
router.patch("/update/:produktId", produktController.updateProdukt);
router.delete("/delete/:produktId", produktController.deleteProdukt);

export = router;
