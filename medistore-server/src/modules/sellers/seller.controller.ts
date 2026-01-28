import type { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/send-response.util";
import { sellerService } from "./seller.service";

const singUpSeller = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await sellerService.singUpSeller(req.body);
    sendResponse(res, {
      statusCode: 201,
      message: "Singup successful!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const sellerController = {
  singUpSeller,
};
