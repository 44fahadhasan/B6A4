import { Router } from "express";
import { Permission } from "../../constants/permissions";
import UserRole from "../../constants/roles";
import auth from "../../middlewares/auth.middleware";
import { reviewController } from "./review.controller";

const reviewRouter = Router();

reviewRouter.get(
  "/an-medicine/:medicineId",
  reviewController.getAnMedicineReviews,
);

reviewRouter.get(
  "/",
  auth(UserRole.admin, [Permission.VIEW]),
  reviewController.getReviewsForAdmin,
);

reviewRouter.post(
  "/review/add",
  auth(UserRole.customer, [Permission.ADD]),
  reviewController.addReview,
);

reviewRouter.patch(
  "/review/update/:reviewId",
  auth(UserRole.customer, [Permission.EDIT]),
  reviewController.updateReview,
);

reviewRouter.delete(
  "/review/delete/:reviewId",
  auth(UserRole.admin, [Permission.DELETE]),
  reviewController.deleteReview,
);

export default reviewRouter;
