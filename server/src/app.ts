import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middleware/error.middleware";
import authRoutes from './modules/auth/auth.routes'
import clientRoutes from "./modules/client/client.routes";
import projectRoutes from './modules/project/project.routes';
import taskRoutes from './modules/task/task.routes';
import dashboardRoutes from './modules/dashboard/dashboard.routes';
import { globalRateLimiter } from "./middleware/rateLimit.middleware";
import { securityMiddleware } from "./middleware/security.middleware";

const app = express();

app.use(securityMiddleware);
app.use(cors());
app.use(globalRateLimiter)
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(errorMiddleware);

export default app;