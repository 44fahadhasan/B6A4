import type { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/send-response.util";
import { pharmaceService } from "./pharmace.service";

const pharmaceProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await pharmaceService.pharmaceProfile(req.body);

    sendResponse(res, {
      statusCode: 201,
      message: "Pharmacy profile saved successful!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const pharmaceController = {
  pharmaceProfile,
};
