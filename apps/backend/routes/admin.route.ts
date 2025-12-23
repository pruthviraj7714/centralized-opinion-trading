import { Router } from "express";
import { requireAdmin, requireAuth } from "../middlewares/user.middleware";
import { createMarketController, fetchAdminMarketsController } from "../controlleres/admin.controllers";

const adminRouter = Router();

adminRouter.post("/markets", requireAuth, requireAdmin, createMarketController);

adminRouter.get("/markets", requireAuth, requireAdmin, fetchAdminMarketsController);


export default adminRouter;
