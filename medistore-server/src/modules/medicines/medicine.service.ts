import type { Request } from "express";
import { prisma } from "../../config/prisma";
import { Status as MedicineStatus } from "../../constants/status";
import type { Medicine, Status } from "../../generated/prisma/client";
import type { MedicineWhereInput } from "../../generated/prisma/models";
import paginationOptions from "../../utils/pagination.util";

const getMedicines = async (req: Request) => {
  const { search, category, manufacturer, featured, minPrice, maxPrice } =
    req.query;
  const { page, limit, skip, orderBy, order } = paginationOptions(req);

  const where: MedicineWhereInput = {
    status: "published",
    ...(search
      ? {
          OR: [
            {
              name: {
                contains: search as string,
                mode: "insensitive",
              },
            },
            {
              genericName: {
                contains: search as string,
                mode: "insensitive",
              },
            },
          ],
        }
      : {}),
    ...(featured && ["true", "false"].includes(featured as string)
      ? {
          isFeatured: JSON.parse(featured as string),
        }
      : {}),
    ...(category
      ? {
          categorie: {
            name: category as string,
          },
        }
      : {}),
    ...(manufacturer
      ? {
          manufacturer: manufacturer as string,
        }
      : {}),
    ...(minPrice || maxPrice
      ? {
          inventories: {
            some: {
              sellingPrice: {
                gt: minPrice ? Number(minPrice) : 0,
                lte: maxPrice ? Number(maxPrice) : 1000000000,
              },
            },
          },
        }
      : {}),
  };

  const [medicine, total] = await prisma.$transaction([
    prisma.medicine.findMany({
      skip,
      take: limit,
      where,
      orderBy: { [orderBy]: order },
      include: {
        inventories: {
          select: {
            mrp: true,
            sellingPrice: true,
            discount: true,
            minStock: true,
            expiryDate: true,
          },
        },
        categorie: {
          select: {
            name: true,
            slug: true,
          },
        },
        pharmacie: {
          select: {
            name: true,
            slug: true,
          },
        },
        reviews: {
          select: {
            rating: true,
            comment: true,
            createdAt: true,
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
      },
    }),
    prisma.medicine.count({ where }),
  ]);

  return { medicine, meta: { page, limit, total } };
};

const getMedicinesForAdmin = async (req: Request) => {
  const { status, search, featured } = req.query;
  const { page, limit, skip, orderBy, order } = paginationOptions(req);

  const where: MedicineWhereInput = {
    ...(status && MedicineStatus.includes(status as string)
      ? {
          status: status as Status,
        }
      : {}),
    ...(featured && ["true", "false"].includes(featured as string)
      ? {
          isFeatured: JSON.parse(featured as string),
        }
      : {}),
    ...(search
      ? {
          OR: [
            {
              name: {
                contains: search as string,
                mode: "insensitive",
              },
            },
            {
              genericName: {
                contains: search as string,
                mode: "insensitive",
              },
            },
            {
              manufacturer: {
                contains: search as string,
                mode: "insensitive",
              },
            },
            {
              categorie: {
                name: {
                  contains: search as string,
                  mode: "insensitive",
                },
              },
            },
          ],
        }
      : {}),
  };

  const [medicine, total] = await prisma.$transaction([
    prisma.medicine.findMany({
      skip,
      take: limit,
      where,
      orderBy: { [orderBy]: order },
      include: {
        categorie: {
          select: {
            name: true,
          },
        },
        inventories: {
          select: {
            purchasePrice: true,
            mrp: true,
            sellingPrice: true,
            discount: true,
            stock: true,
            minStock: true,
            lowStockThreshold: true,
            isExpired: true,
          },
        },
      },
    }),
    prisma.medicine.count({ where }),
  ]);

  return { medicine, meta: { page, limit, total } };
};

const getMedicine = async (medicineId: string) => {
  const result = await prisma.medicine.findUnique({
    where: {
      id: medicineId,
      status: "published",
    },
    include: {
      categorie: {
        select: {
          name: true,
          slug: true,
          description: true,
          image: true,
        },
      },
      inventories: {
        select: {
          mrp: true,
          sellingPrice: true,
          discount: true,
          minStock: true,
          expiryDate: true,
        },
      },
      reviews: {
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
      },
      pharmacie: {
        select: {
          name: true,
          slug: true,
          image: true,
        },
      },
    },
  });
  return result;
};

const getMedicineForAdmin = async (medicineId: string) => {
  const result = await prisma.medicine.findUnique({
    where: { id: medicineId },
    include: {
      categorie: true,
      inventories: true,
      pharmacie: true,
      reviews: true,
      orderItems: true,
      cartItems: true,
      user: true,
    },
  });
  return result;
};

const createMedicine = async (payload: Medicine) => {
  const result = await prisma.medicine.create({ data: payload });
  return result;
};

const updateMedicine = async (medicineId: string, payload: Medicine) => {
  const result = await prisma.medicine.update({
    data: payload,
    where: { id: medicineId },
  });
  return result;
};

const deleteMedicine = async (medicineId: string) => {
  const result = await prisma.medicine.delete({ where: { id: medicineId } });
  return result;
};

export const medicineService = {
  createMedicine,
  updateMedicine,
  getMedicine,
  getMedicineForAdmin,
  getMedicines,
  getMedicinesForAdmin,
  deleteMedicine,
};
