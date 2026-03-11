import express from "express";
import cors from "cors";

import carRoutes from "./routes/car.routes.js";
import usedCarsRoutes from "./routes/usedCars.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import newsletterRoutes from "./routes/newsletter.routes.js";
import appointmentRoutes from "./routes/appointmentsRoutes.js"
import financingRoutes from "./routes/financing.routes.js";
import { pool } from "./config/db.js";


import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/cars", carRoutes);
app.use("/api/models", carRoutes);
app.use("/api/used_cars", usedCarsRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/financing", financingRoutes);
app.use("/api/appointments", appointmentRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: "route_not_found",
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

app.use(errorHandler);

export default app;

app.use(cors());
app.use(express.json());

pool.query("SELECT current_database(), current_schema()")
  .then((res) => console.log("DB actual:", res.rows[0]))
  .catch((err) => console.error("DB error:", err));

pool.query("SELECT COUNT(*) AS total FROM public.used_cars")
  .then((res) => console.log("COUNT used_cars:", res.rows[0]))
  .catch((err) => console.error("COUNT error:", err));

pool.query("SELECT * FROM public.used_cars LIMIT 5")
  .then((res) => console.log("MUESTRA used_cars:", res.rows))
  .catch((err) => console.error("SELECT error:", err));