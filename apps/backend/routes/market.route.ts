import { Router } from "express";
import {
  fetchParticipationChartDataController,
  fetchProbabilityOverTimeChartDataController,
  getMarketByIdController,
  getMarketsController,
  getMarketTrades,
  placeTradeController,
} from "../controlleres/market.controllers";
import { requireAuth, requireUser } from "../middlewares/user.middleware";

const marketRouter = Router();

marketRouter.get("/", requireAuth, requireUser, getMarketsController);

marketRouter.get(
  "/:marketId",
  requireAuth,
  requireUser,
  getMarketByIdController
);

marketRouter.get(
  "/:marketId/trades",
  requireAuth,
  requireUser,
  getMarketTrades
);

marketRouter.post(
  "/:marketId/trades",
  requireAuth,
  requireUser,
  placeTradeController
);

marketRouter.get(
  "/:marketId/charts/probability",
  requireAuth,
  requireUser,
  fetchProbabilityOverTimeChartDataController
)

marketRouter.get(
  "/:marketId/charts/participation",
  requireAuth,
  requireUser,
  fetchParticipationChartDataController
)


export default marketRouter;
