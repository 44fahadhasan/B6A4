import { Router } from "express";
import { Permission } from "../../constants/permissions";
import UserRole from "../../constants/roles";
import auth from "../../middlewares/auth.middleware";
import { inventoryController } from "./inventory.controller";

const inventoryRouter = Router();

inventoryRouter.get(
  "/",
  auth(UserRole.seller, [Permission.VIEW]),
  inventoryController.getInventoreis,
);

inventoryRouter.post(
  "/inventory/create",
  auth(UserRole.seller, [Permission.ADD]),
  inventoryController.createInventory,
);

inventoryRouter.patch(
  "/inventory/update/:inventoryId",
  auth(UserRole.seller, [Permission.EDIT]),
  inventoryController.updateInventory,
);

inventoryRouter.delete(
  "/inventory/delete/:inventoryId",
  auth(UserRole.seller, [Permission.DELETE]),
  inventoryController.deleteInventory,
);

export default inventoryRouter;
