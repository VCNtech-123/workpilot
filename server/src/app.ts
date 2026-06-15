import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middleware/error.middleware";
import authRoutes from './modules/auth/auth.routes'
import { protect } from "./middleware/auth.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    status: "success",
    message: "WorkPilot API is running 🚀",
  });
});

app.use('/api/auth', authRoutes)

app.use(errorMiddleware);
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "You accessed a protected route",
    user: (req as any).user,
  });
});

export default app;