import type { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/send-response.util";
import { deliveryAddressService } from "./delivery-address.service";

const deliveryAddress = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user, body } = req;

    if (!user?.id) {
      throw new Error("User id is required");
    }

    const data = await deliveryAddressService.deliveryAddress({
      ...body,
      userId: user?.id,
    });

    sendResponse(res, {
      statusCode: 201,
      message: "Delivery address saved successful!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getDeliveryAddress = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user } = req;

    if (!user?.id) {
      throw new Error("User id is required");
    }

    const data = await deliveryAddressService.getDeliveryAddress(user?.id);

    sendResponse(res, {
      message: "Delivery address get!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const deliveryAddressController = {
  deliveryAddress,
  getDeliveryAddress,
};
