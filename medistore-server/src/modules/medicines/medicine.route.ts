import { Router } from "express";
import { Permission } from "../../constants/permissions";
import UserRole from "../../constants/roles";
import auth from "../../middlewares/auth.middleware";
import { medicineController } from "./medicine.controller";

const medicineRouter = Router();

medicineRouter.get("/", medicineController.getMedicines);

medicineRouter.get(
  "/seller",
  auth(UserRole.seller, [Permission.VIEW]),
  medicineController.getMedicinesForSeller,
);

medicineRouter.get(
  "/admin",
  auth(UserRole.admin, [Permission.VIEW]),
  medicineController.getMedicinesForAdmin,
);

medicineRouter.get("/medicine/:medicineId", medicineController.getMedicine);

medicineRouter.get(
  "/medicine/:medicineId/admin",
  auth(UserRole.admin, [Permission.VIEW]),
  medicineController.getMedicineForAdmin,
);

medicineRouter.post(
  "/medicine/create",
  auth(UserRole.seller, [Permission.ADD]),
  medicineController.createMedicine,
);

medicineRouter.patch(
  "/medicine/update/:medicineId",
  auth(UserRole.seller, [Permission.EDIT]),
  medicineController.updateMedicine,
);

medicineRouter.delete(
  "/medicine/delete/:medicineId",
  auth(UserRole.seller, [Permission.DELETE]),
  medicineController.deleteMedicine,
);

export default medicineRouter;
