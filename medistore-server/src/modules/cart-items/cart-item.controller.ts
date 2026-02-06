import type { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/send-response.util";
import { cartService } from "./cart-item.service";

const getCartItems = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await cartService.getCartItems(req);

    sendResponse(res, {
      message: "Cart items get!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const mageCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user, body } = req;

    if (!user?.id) {
      throw new Error("User id is required");
    }

    const data = await cartService.mageCartItem({
      ...body,
      userId: user?.id,
    });

    sendResponse(res, {
      statusCode: 201,
      message: "Cart item added!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCartItem = async (
  req: Request<{ cartItemId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await cartService.deleteCartItem(req.params.cartItemId);

    sendResponse(res, {
      message: "Cart item deleted!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const clearCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await cartService.clearCart(req.body);

    sendResponse(res, {
      message: "Cart item deleted!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const cartItemController = {
  getCartItems,
  mageCartItem,
  deleteCartItem,
  clearCart,
};
