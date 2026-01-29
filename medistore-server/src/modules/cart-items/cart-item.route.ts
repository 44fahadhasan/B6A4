import { Router } from "express";
import { Permission } from "../../constants/permissions";
import UserRole from "../../constants/roles";
import auth from "../../middlewares/auth.middleware";
import { cartItemController } from "./cart-item.controller";

const cartItemRouter = Router();

cartItemRouter.get(
  "/medicine/cart-item/list",
  auth(UserRole.customer, [Permission.VIEW]),
  cartItemController.getCartItems,
);

cartItemRouter.post(
  "/medicine/cart-item/add",
  auth(UserRole.customer, [Permission.ADD]),
  cartItemController.addCartItem,
);

cartItemRouter.patch(
  "/medicine/cart-item/update/:cartItemId",
  auth(UserRole.customer, [Permission.EDIT]),
  cartItemController.updateCartItem,
);

cartItemRouter.delete(
  "/medicine/cart-item/delete/:cartItemId",
  auth(UserRole.customer, [Permission.DELETE]),
  cartItemController.deleteCartItem,
);

export default cartItemRouter;
