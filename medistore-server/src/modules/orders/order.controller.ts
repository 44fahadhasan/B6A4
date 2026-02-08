import type { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/send-response.util";
import { cartService } from "../cart-items/cart-item.service";
import { orderService } from "./order.service";

const getOrdersForCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await orderService.getOrdersForCustomer(req);

    sendResponse(res, {
      message: "Orders get!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getOrdersForSeller = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await orderService.getOrdersForSeller(req);

    sendResponse(res, {
      message: "Orders get!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getOrdersForAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await orderService.getOrdersForAdmin(req);

    sendResponse(res, {
      message: "Orders get!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getOrderForCustomer = async (
  req: Request<{ orderId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await orderService.getOrderForCustomer(req.params.orderId);

    sendResponse(res, {
      statusCode: 200,
      message: "Order get!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getOrderForSeller = async (
  req: Request<{ orderId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user } = req;

    if (!user?.pharmacieId) {
      throw new Error("Pharmacy id is required.");
    }

    const data = await orderService.getOrderForSeller(
      req.params.orderId,
      user?.pharmacieId,
    );

    sendResponse(res, {
      statusCode: 200,
      message: "Order get!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getOrderForAdmin = async (
  req: Request<{ orderId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await orderService.getOrderForAdmin(req.params.orderId);

    sendResponse(res, {
      statusCode: 200,
      message: "Order get!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user, body } = req;

    if (!user?.id) {
      throw new Error("User id is required");
    }

    const cartItems = await cartService.getCartItemsForOrder(user.id);

    if (!cartItems.length) {
      throw new Error("Your cart is empty");
    }

    const data = await orderService.createOrder({
      ...body,
      userId: user.id,
      pharmacyOrders: cartItems,
    });

    sendResponse(res, {
      statusCode: 201,
      message: "Order created!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (
  req: Request<{ orderId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      params: { orderId },
      body,
    } = req;

    const data = await orderService.updateOrder(orderId, body);

    sendResponse(res, {
      message: "Order updated!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const deleteOrder = async (
  req: Request<{ orderId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await orderService.deleteOrder(req.params.orderId);

    sendResponse(res, {
      message: "Order deleted!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const orderController = {
  getOrdersForCustomer,
  getOrdersForSeller,
  getOrdersForAdmin,
  getOrderForCustomer,
  getOrderForSeller,
  getOrderForAdmin,
  createOrder,
  updateOrder,
  deleteOrder,
};
