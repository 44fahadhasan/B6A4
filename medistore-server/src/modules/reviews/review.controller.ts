import type { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/send-response.util";
import { reviewService } from "./review.service";

const getAnMedicineReviews = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await reviewService.getAnMedicineReviews(req);

    sendResponse(res, {
      message: "Review items get!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getReviewsForAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await reviewService.getReviewsForAdmin(req);

    sendResponse(res, {
      message: "Review items get!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const addReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await reviewService.addReview(req.body);

    sendResponse(res, {
      statusCode: 201,
      message: "Review item added!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const updateReview = async (
  req: Request<{ reviewId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      params: { reviewId },
      body,
    } = req;

    const data = await reviewService.updateReview(reviewId, body);

    sendResponse(res, {
      message: "Review item updated!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const deleteReview = async (
  req: Request<{ reviewId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await reviewService.deleteReview(req.params.reviewId);

    sendResponse(res, {
      message: "Review item deleted!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const reviewController = {
  getAnMedicineReviews,
  getReviewsForAdmin,
  addReview,
  updateReview,
  deleteReview,
};
