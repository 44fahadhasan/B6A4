import type { Request } from "express";
import { prisma } from "../../config/prisma";
import { Status as MedicineStatus } from "../../constants/status";
import type { Medicine, Status } from "../../generated/prisma/client";
import type { MedicineWhereInput } from "../../generated/prisma/models";
import paginationOptions from "../../utils/pagination.util";

const getMedicines = async (req: Request) => {
  const { search, category, featured, minPrice, maxPrice } = req.query;
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
            {
              manufacturer: {
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

  const [raw_medicines, total] = await prisma.$transaction([
    prisma.medicine.findMany({
      skip,
      take: limit,
      where,
      orderBy: { [orderBy]: order },
      include: {
        inventories: {
          select: {
            id: true,
            batchNumber: true,
            mrp: true,
            sellingPrice: true,
            discount: true,
            stock: true,
            minStock: true,
            reservedQty: true,
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
            id: true,
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

  const medicines = raw_medicines.map((medicine) => {
    const valid_stock_batch = medicine.inventories
      .filter(
        (inventory) =>
          inventory.stock > 0 && new Date(inventory.expiryDate) > new Date(),
      )
      .sort(
        (a, b) =>
          new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime(),
      );

    const total_stock = valid_stock_batch.reduce(
      (sum, inventory) => sum + inventory.stock - inventory.reservedQty,
      0,
    );

    const active_batch = valid_stock_batch.at(0) ?? null;

    return {
      // medicine info
      id: medicine.id,
      name: medicine.name,
      slug: medicine.slug,
      genericName: medicine.genericName,
      manufacturer: medicine.manufacturer,
      dosageForm: medicine.dosageForm,
      strength: medicine.strength,
      categorie: medicine.categorie,
      pharmacie: medicine.pharmacie,
      reviews: medicine.reviews,
      // inventory infos
      isOutOfStock: total_stock <= 0,
      stock: active_batch
        ? {
            mrp: active_batch.mrp,
            availableQty: total_stock,
            discount: active_batch.discount,
            expiryDate: active_batch.expiryDate,
            sellingPrice: active_batch.sellingPrice,
          }
        : null,
    };
  });

  return { medicines, meta: { page, limit, total } };
};

const getMedicinesForSeller = async (req: Request) => {
  const { status, search, featured } = req.query;
  const { page, limit, skip, orderBy, order } = paginationOptions(req);

  if (!req.user?.pharmacieId) {
    throw new Error("Pharmacie id is required");
  }

  const where: MedicineWhereInput = {
    pharmacieId: req.user.pharmacieId,
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

  const [medicines, total] = await prisma.$transaction([
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

  return { medicines, meta: { page, limit, total } };
};

const getMedicinesForAdmin = async (req: Request) => {
  const { status, search, featured } = req.query;
  const { page, limit, skip, orderBy, order } = paginationOptions(req);

  const where: MedicineWhereInput = {
    status: "published",
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

  const [medicines, total] = await prisma.$transaction([
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
        pharmacie: {
          select: {
            name: true,
            owner: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    }),
    prisma.medicine.count({ where }),
  ]);

  return { medicines, meta: { page, limit, total } };
};

const getMedicine = async (medicineId: string) => {
  const medicine = await prisma.medicine.findUniqueOrThrow({
    where: {
      id: medicineId,
      status: "published",
    },
    include: {
      pharmacie: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
      categorie: {
        select: {
          name: true,
          slug: true,
        },
      },
      inventories: {
        select: {
          id: true,
          batchNumber: true,
          mrp: true,
          sellingPrice: true,
          discount: true,
          stock: true,
          minStock: true,
          reservedQty: true,
          expiryDate: true,
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
  });

  const valid_stock_batch = medicine.inventories
    .filter((inv) => inv.stock > 0 && new Date(inv.expiryDate) > new Date())
    .sort(
      (a, b) =>
        new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime(),
    );

  const total_stock = valid_stock_batch.reduce(
    (sum, inv) => sum + (inv.stock - inv.reservedQty),
    0,
  );

  const active_batch = valid_stock_batch.at(0) ?? null;

  return {
    id: medicine.id,
    name: medicine.name,
    slug: medicine.slug,
    genericName: medicine.genericName,
    manufacturer: medicine.manufacturer,
    dosageForm: medicine.dosageForm,
    strength: medicine.strength,
    categorie: medicine.categorie,
    pharmacie: medicine.pharmacie,
    reviews: medicine.reviews,
    isOutOfStock: total_stock <= 0,
    stock: active_batch
      ? {
          mrp: active_batch.mrp,
          availableQty: total_stock,
          discount: active_batch.discount,
          expiryDate: active_batch.expiryDate,
          sellingPrice: active_batch.sellingPrice,
        }
      : null,
  };
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
  getMedicinesForSeller,
  getMedicineForAdmin,
  getMedicines,
  getMedicinesForAdmin,
  deleteMedicine,
};
