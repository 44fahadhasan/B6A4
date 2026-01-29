import type { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/send-response.util";
import { deliveryAddressService } from "./delivery-address.service";

const customerdeliveryAddress = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await deliveryAddressService.customerdeliveryAddress(req.body);

    sendResponse(res, {
      statusCode: 201,
      message: "Delivery address saved successful!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const deliveryAddressController = {
  customerdeliveryAddress,
};
