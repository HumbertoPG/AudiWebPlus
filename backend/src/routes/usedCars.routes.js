import express from "express";
import { getUsedCars, getUsedCar } from "../controllers/usedCarsController.js";

const router = express.Router();

router.get("/", getUsedCars);
router.get("/:id", getUsedCar);

export default router;