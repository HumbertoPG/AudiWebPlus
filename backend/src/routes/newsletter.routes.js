import { Router } from "express";
import { subscribeNewsletter } from "../controllers/newsletter.controller.js";

const router = Router();

// Esta es una ruta de API, no un componente de React
router.post("/", subscribeNewsletter);

export default router;