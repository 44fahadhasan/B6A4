import type { Request } from "express";
import { prisma } from "../../config/prisma";
import type { Inventory } from "../../generated/prisma/client";
import type { InventoryWhereInput } from "../../generated/prisma/models";
import paginationOptions from "../../utils/pagination.util";

const getInventoreis = async (req: Request) => {
  const { search } = req.query;
  const { page, limit, skip, orderBy, order } = paginationOptions(req);

  if (!req.user?.pharmacieId) {
    throw new Error("Pharmacie id is required");
  }

  const where: InventoryWhereInput = {
    pharmacieId: req.user.pharmacieId,
    ...(search
      ? {
          OR: [
            {
              batchNumber: {
                contains: search as string,
                mode: "insensitive",
              },
            },
            {
              medicine: {
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
                    brandName: {
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
              },
            },
          ],
        }
      : {}),
  };

  const [inventories, total] = await prisma.$transaction([
    prisma.inventory.findMany({
      skip,
      take: limit,
      where,
      orderBy: { [orderBy]: order },
      include: {
        medicine: {
          select: {
            name: true,
            genericName: true,
            brandName: true,
            categorie: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    }),
    prisma.inventory.count({ where }),
  ]);

  return { inventories, meta: { page, limit, total } };
};

const createInventory = async (payload: Inventory) => {
  const result = await prisma.inventory.create({ data: payload });
  return result;
};

const updateInventory = async (inventoryId: string, payload: Inventory) => {
  const result = await prisma.inventory.update({
    data: payload,
    where: { id: inventoryId },
  });
  return result;
};

const deleteInventory = async (inventoryId: string) => {
  console.log({ inventoryId });
  const result = await prisma.inventory.delete({ where: { id: inventoryId } });
  return result;
};

export const inventoreiservice = {
  getInventoreis,
  createInventory,
  updateInventory,
  deleteInventory,
};
