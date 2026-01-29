import { Router } from "express";
import { Permission } from "../../constants/permissions";
import UserRole from "../../constants/roles";
import auth from "../../middlewares/auth.middleware";
import { medicineController } from "./medicine.controller";

const medicineRouter = Router();

medicineRouter.get(
  "/",
  auth(UserRole.admin, [Permission.VIEW]),
  medicineController.getMedicines,
);

medicineRouter.get("/medicine/:medicineId", medicineController.getMedicine);

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
