import type { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/send-response.util";
import { StatService } from "./stat.service";

const getStatsForAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await StatService.getStatsForAdmin();

    sendResponse(res, {
      message: "Stats get!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getStatsForSeller = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user } = req;

    if (!user?.pharmacieId) {
      throw new Error("Please add at least one pharmacy to continue.");
    }

    const data = await StatService.getStatsForSeller(user.pharmacieId);

    sendResponse(res, {
      message: "Stats get!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const statsController = {
  getStatsForAdmin,
  getStatsForSeller,
};
