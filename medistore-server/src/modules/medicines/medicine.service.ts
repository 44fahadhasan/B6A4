import type { Request } from "express";
import { prisma } from "../../config/prisma";
import { Status as MedicineStatus } from "../../constants/status";
import type { Medicine, Status } from "../../generated/prisma/client";
import type { MedicineWhereInput } from "../../generated/prisma/models";
import paginationOptions from "../../utils/pagination.util";

const getMedicines = async (req: Request) => {
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
    where: { id: medicineId },
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
  getMedicines,
  deleteMedicine,
};
