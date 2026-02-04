import type { Request } from "express";
import { prisma } from "../../config/prisma";
import { PharmacieStatus as PharmacieStatusSearch } from "../../constants/status";
import type { Pharmacie, PharmacieStatus } from "../../generated/prisma/client";
import type { PharmacieWhereInput } from "../../generated/prisma/models";
import paginationOptions from "../../utils/pagination.util";

const getPharmaciesForSeller = async (req: Request) => {
  const { status, search } = req.query;
  const { page, limit, skip, orderBy, order } = paginationOptions(req);

  if (!req.user?.id) {
    throw new Error("User id is required");
  }

  const where: PharmacieWhereInput = {
    ownerId: req.user.id,
    ...(status && PharmacieStatusSearch.includes(status as string)
      ? {
          status: status as PharmacieStatus,
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
              licenceNumber: {
                contains: search as string,
                mode: "insensitive",
              },
            },
          ],
        }
      : {}),
  };

  const [pharmacies, total] = await prisma.$transaction([
    prisma.pharmacie.findMany({
      skip,
      take: limit,
      where,
      orderBy: { [orderBy]: order },
      include: {
        _count: true,
        medicines: true,
        pharmacieOrders: true,
        inventories: true,
      },
    }),
    prisma.pharmacie.count({ where }),
  ]);

  return { pharmacies, meta: { page, limit, total } };
};

const getPharmaciesForAdmin = async (req: Request) => {
  const { search } = req.query;
  const { page, limit, skip, orderBy, order } = paginationOptions(req);

  const where: PharmacieWhereInput = {
    status: "active",
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
              licenceNumber: {
                contains: search as string,
                mode: "insensitive",
              },
            },
            {
              owner: {
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

  const [pharmacies, total] = await prisma.$transaction([
    prisma.pharmacie.findMany({
      skip,
      take: limit,
      where,
      orderBy: { [orderBy]: order },
      include: {
        owner: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    }),
    prisma.pharmacie.count({ where }),
  ]);

  return { pharmacies, meta: { page, limit, total } };
};

const getPharmacie = async (pharmacieId: string) => {
  const result = await prisma.pharmacie.findUnique({
    where: {
      id: pharmacieId,
    },
    include: {
      medicines: true,
      inventories: true,
      pharmacieOrders: true,
    },
  });
  return result;
};

const getPharmacieForAdmin = async (pharmacieId: string) => {
  const result = await prisma.pharmacie.findUnique({
    where: { id: pharmacieId },
    include: {
      _count: true,
      owner: true,
      cartItems: true,
      inventories: true,
      medicines: true,
      pharmacieOrders: true,
    },
  });
  return result;
};

const createPharmacie = async (payload: Pharmacie) => {
  const result = await prisma.pharmacie.create({ data: payload });
  return result;
};

const updatePharmacie = async (pharmacieId: string, payload: Pharmacie) => {
  const result = await prisma.pharmacie.update({
    data: payload,
    where: { id: pharmacieId },
  });
  return result;
};

const deletePharmacie = async (pharmacieId: string) => {
  const result = await prisma.pharmacie.delete({ where: { id: pharmacieId } });
  return result;
};

export const pharmacieService = {
  createPharmacie,
  updatePharmacie,
  getPharmacie,
  getPharmaciesForSeller,
  getPharmacieForAdmin,
  getPharmaciesForAdmin,
  deletePharmacie,
};
