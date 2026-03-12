import { Router } from "express";
import {
  getSubscribers,
  getSubscriberById,
  createSubscriber,
  updateSubscriber,
  deleteSubscriber
} from "../controllers/newsletter.controller.js";

const router = Router();

router.get("/", getSubscribers);
router.get("/:id", getSubscriberById);
router.post("/", createSubscriber);
router.put("/:id", updateSubscriber);
router.delete("/:id", deleteSubscriber);

export default router;