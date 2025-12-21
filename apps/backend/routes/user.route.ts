import { Router } from "express";
import { requireAuth, requireUser } from "../middlewares/user.middleware";
import {
  fetchUserOrdersController,
  fetchUserProfieController,
  fetchUserTradesController,
} from "../controlleres/user.controllers";

const userRouter = Router();

userRouter.get("/me", requireAuth, requireUser, fetchUserProfieController);

userRouter.get("/orders", requireAuth, requireUser, fetchUserOrdersController);

userRouter.get("/trades", requireAuth, requireUser, fetchUserTradesController);

export default userRouter;
