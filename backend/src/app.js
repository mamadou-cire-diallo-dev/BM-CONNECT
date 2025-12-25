import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import { env } from "./config/env.js";
import apiRoutes from "./routes/index.js";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN === "*" ? true : env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "2mb" }));
app.use(morgan("dev"));
app.use(cookieParser());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// API
app.use("/api", apiRoutes);

// 404
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

// errors
app.use(errorMiddleware);

export default app;
