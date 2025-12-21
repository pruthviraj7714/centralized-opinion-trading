import { Router } from "express";
import { requireAdmin, requireAuth } from "../middlewares/user.middleware";
import { createMarketController } from "../controlleres/admin.controllers";

const adminRouter = Router();

adminRouter.post("/markets", requireAdmin, requireAuth, createMarketController);

export default adminRouter;
