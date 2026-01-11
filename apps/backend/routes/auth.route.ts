import { Router } from "express";
import { requireAuth, requireUser } from "../middlewares/user.middleware";
import {
  fetchUserAccountOverviewInfoController,
  loginUserController,
  registerUserController,
} from "../controlleres/auth.controllers";

const authRouter = Router();

authRouter.post("/register", registerUserController);

authRouter.post("/login", loginUserController);

authRouter.get("/me", requireAuth, requireUser, fetchUserAccountOverviewInfoController);

export default authRouter;
