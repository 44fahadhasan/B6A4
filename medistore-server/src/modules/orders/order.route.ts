import { Router } from "express";
import { Permission } from "../../constants/permissions";
import UserRole from "../../constants/roles";
import auth from "../../middlewares/auth.middleware";
import { orderController } from "./order.controller";

const orderRouter = Router();

orderRouter.get(
  "/orders",
  auth(UserRole.customer, [Permission.VIEW]),
  orderController.getOrdersForCustomer,
);

orderRouter.get(
  "/seller",
  auth(UserRole.seller, [Permission.VIEW]),
  orderController.getOrdersForSeller,
);

orderRouter.get(
  "/",
  auth(UserRole.admin, [Permission.VIEW]),
  orderController.getOrdersForAdmin,
);

orderRouter.get(
  "/orders/order/:orderId",
  auth(UserRole.customer, [Permission.VIEW]),
  orderController.getOrderForCustomer,
);

orderRouter.get(
  "/order/seller/:orderId",
  auth(UserRole.seller, [Permission.VIEW]),
  orderController.getOrderForSeller,
);

orderRouter.get(
  "/order/:orderId",
  auth(UserRole.admin, [Permission.VIEW]),
  orderController.getOrderForAdmin,
);

orderRouter.post(
  "/orders/order/create",
  auth(UserRole.customer, [Permission.ADD]),
  orderController.createOrder,
);

orderRouter.patch(
  "/orders/order/update/:orderId",
  auth(UserRole.seller, [Permission.EDIT]),
  orderController.updateOrder,
);

orderRouter.delete(
  "/orders/order/delete/:orderId",
  auth(UserRole.admin, [Permission.DELETE]),
  orderController.deleteOrder,
);

export default orderRouter;
