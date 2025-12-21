import { Router } from "express";
import { requireAuth, requireUser } from "../middlewares/user.middleware";
import {
  fetchUserAuthInfoController,
  loginUserController,
  registerUserController,
} from "../controlleres/auth.controllers";

const authRouter = Router();

authRouter.post("/register", registerUserController);

authRouter.post("/login", loginUserController);

authRouter.get("/me", requireUser, requireAuth, fetchUserAuthInfoController);

export default authRouter;
