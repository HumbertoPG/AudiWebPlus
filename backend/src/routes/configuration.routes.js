import { Router } from "express";
import {
  getConfigurations,
  getConfigurationById,
  createConfiguration,
  updateConfiguration,
  deleteConfiguration
} from "../controllers/configuration.controller.js";

const router = Router();

router.get("/", getConfigurations);
router.get("/:id", getConfigurationById);
router.post("/", createConfiguration);
router.put("/:id", updateConfiguration);
router.delete("/:id", deleteConfiguration);

export default router;