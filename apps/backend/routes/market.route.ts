import { Router } from "express";
import {
  getMarketByIdController,
  getMarketsController,
  getMarketTrades,
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

//TODO
// marketRouter.get(
//   "/:marketId/orderbook",
//   async (req: Request, res: Response) => {
//     try {
//       const marketId = req.params.marketId;

//       const market = await prisma.market.findFirst({
//         where: {
//           id: marketId,
//         },
//         include: {
//           orders: true,
//         },
//       });
//     } catch (error) {
//       res.status(500).json({
//         message: "Internal Server Error",
//       });
//     }
//   }
// );

marketRouter.get(
  "/:marketId/trades",
  requireAuth,
  requireUser,
  getMarketTrades
);

export default marketRouter;
