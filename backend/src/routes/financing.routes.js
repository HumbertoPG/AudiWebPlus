import { Router } from "express";
import { createFinancingRequest } from "../controllers/financing.controller.js";

const router = Router();

router.post("/", createFinancingRequest);

export default router;