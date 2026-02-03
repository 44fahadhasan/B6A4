import { Router } from "express";
import { Permission } from "../../constants/permissions";
import UserRole from "../../constants/roles";
import auth from "../../middlewares/auth.middleware";
import { deliveryAddressController } from "./delivery-address.controller";

const deliveryAddressRouter = Router();

deliveryAddressRouter.put(
  "/delivery-address",
  auth(UserRole.customer, [Permission.ADD, Permission.EDIT]),
  deliveryAddressController.deliveryAddress,
);

deliveryAddressRouter.get(
  "/delivery-address",
  auth(UserRole.customer, [Permission.VIEW]),
  deliveryAddressController.getDeliveryAddress,
);

export default deliveryAddressRouter;
