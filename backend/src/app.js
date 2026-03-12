import express from "express";
import cors from "cors";

import carRoutes from "./routes/car.routes.js";
import configurationRoutes from "./routes/configuration.routes.js";
import usedCarsRoutes from "./routes/usedCars.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import newsletterRoutes from "./routes/newsletter.routes.js";
import financingRoutes from "./routes/financing.routes.js";
import appointmentRoutes from "./routes/appointments.routes.js";

import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    ok: true,
    service: "audiwebplus-backend"
  });
});

app.get("/", (_req, res) => {
  res.status(200).json({
    ok: true,
    message: "API backend running",
    endpoints: {
      cars: "/api/cars",
      modelsAlias: "/api/models",
      configurations: "/api/configurations",
      usedCars: "/api/used-cars",
      usedCarsLegacy: "/api/used_cars",
      chat: "/api/chat",
      newsletter: "/api/newsletter",
      newsletterSubscribers: "/api/newsletter-subscribers",
      financing: "/api/financing",
      financingRequests: "/api/financing-requests",
      appointments: "/api/appointments"
    }
  });
});

app.use("/api/cars", carRoutes);
app.use("/api/models", carRoutes);

app.use("/api/configurations", configurationRoutes);

app.use("/api/used-cars", usedCarsRoutes);
app.use("/api/used_cars", usedCarsRoutes);

app.use("/api/chat", chatRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/newsletter-subscribers", newsletterRoutes);
app.use("/api/financing", financingRoutes);
app.use("/api/financing-requests", financingRoutes);
app.use("/api/appointments", appointmentRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: "route_not_found",
    message: `Route ${req.method} ${req.originalUrl} not found`
  });
});

app.use(errorHandler);

export default app;