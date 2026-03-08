import express from "express";
import cors from "cors";
import carRoutes from "./routes/car.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/cars", carRoutes);
app.use("/api/models", carRoutes);
app.use("/api/chat", chatRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: "route_not_found",
    message: `Route ${req.method} ${req.originalUrl} not found`
  });
});

app.use(errorHandler);

export default app;