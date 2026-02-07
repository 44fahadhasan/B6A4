import type { Request } from "express";
import { prisma } from "../../config/prisma";
import type { Review } from "../../generated/prisma/client";
import paginationOptions from "../../utils/pagination.util";

const getAnMedicineReviews = async (req: Request) => {
  const {
    params: { medicineId },
  } = req;
  const { page, limit, skip } = paginationOptions(req);

  if (!medicineId) {
    throw new Error("Medicine id is required");
  }

  const [review, total] = await prisma.$transaction([
    prisma.review.findMany({
      where: {
        medicineId: medicineId as string,
      },
      skip,
      take: limit,
      select: {
        rating: true,
        comment: true,
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    }),
    prisma.review.count(),
  ]);

  return { review, meta: { page, limit, total } };
};

const getReviewsForAdmin = async (req: Request) => {
  const { page, limit, skip } = paginationOptions(req);

  const [review, total] = await prisma.$transaction([
    prisma.review.findMany({
      skip,
      take: limit,
      include: {
        medicine: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    }),
    prisma.review.count(),
  ]);

  return { review, meta: { page, limit, total } };
};

const addReview = async (payload: Review & { orderId: string }) => {
  const result = await prisma.$transaction(async (tx) => {
    const phOrders = await tx.pharmacieOrder.findMany({
      where: {
        status: "delivered",
        orderId: payload.orderId,
        order: { userId: payload.userId },
      },
      select: { id: true },
    });

    if (!phOrders.length) {
      throw new Error("No delivered pharmacy orders found for this user");
    }

    const reviews = [];

    for (const phOrder of phOrders) {
      const alreadyReviewed = await tx.review.findFirst({
        where: {
          userId: payload.userId,
          pharmacieOrderId: phOrder.id,
        },
      });

      if (alreadyReviewed) continue;

      const newReview = await tx.review.create({
        data: {
          userId: payload.userId,
          pharmacieOrderId: phOrder.id,
          rating: payload.rating,
          comment: payload.comment,
        },
      });

      reviews.push(newReview);
    }

    return reviews;
  });

  return result;
};

const updateReview = async (reviewId: string, payload: Review) => {
  const result = await prisma.review.update({
    data: payload,
    where: { id: reviewId },
  });
  return result;
};

const deleteReview = async (reviewId: string) => {
  const result = await prisma.review.delete({ where: { id: reviewId } });
  return result;
};

export const reviewService = {
  getAnMedicineReviews,
  getReviewsForAdmin,
  addReview,
  updateReview,
  deleteReview,
};
