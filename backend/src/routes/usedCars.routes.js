import { Router } from "express";
import {
  getUsedCars,
  getUsedCarById,
  createUsedCar,
  updateUsedCar,
  deleteUsedCar
} from "../controllers/usedCarsController.js";

const router = Router();

router.get("/", getUsedCars);
router.get("/:id", getUsedCarById);
router.post("/", createUsedCar);
router.put("/:id", updateUsedCar);
router.delete("/:id", deleteUsedCar);

export default router;