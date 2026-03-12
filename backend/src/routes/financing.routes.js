import { Router } from "express";
import {
  getFinancingRequests,
  getFinancingRequestById,
  createFinancingRequest,
  updateFinancingRequest,
  deleteFinancingRequest
} from "../controllers/financing.controller.js";

const router = Router();

router.get("/", getFinancingRequests);
router.get("/:id", getFinancingRequestById);
router.post("/", createFinancingRequest);
router.put("/:id", updateFinancingRequest);
router.delete("/:id", deleteFinancingRequest);

export default router;