import { Router } from "express";
import { Permission } from "../../constants/permissions";
import UserRole from "../../constants/roles";
import auth from "../../middlewares/auth.middleware";
import { statsController } from "./stat.controller";

const statRouter = Router();

statRouter.get(
  "/admin",
  auth(UserRole.admin, [Permission.VIEW]),
  statsController.getStatsForAdmin,
);

statRouter.get(
  "/seller",
  auth(UserRole.seller, [Permission.VIEW]),
  statsController.getStatsForSeller,
);

export default statRouter;
