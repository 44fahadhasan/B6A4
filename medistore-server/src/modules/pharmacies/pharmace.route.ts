import { Router } from "express";
import { Permission } from "../../constants/permissions";
import UserRole from "../../constants/roles";
import auth from "../../middlewares/auth.middleware";
import { pharmaceController } from "./pharmace.controller";

const pharmaceRouter = Router();

pharmaceRouter.put(
  "/profile",
  auth(UserRole.seller, [Permission.ADD, Permission.EDIT]),
  pharmaceController.pharmaceProfile,
);

export default pharmaceRouter;
