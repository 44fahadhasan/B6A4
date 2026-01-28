import type { Request } from "express";
import { prisma } from "../../config/prisma";
import { Status as CategorieStatus } from "../../constants/status";
import type { Categorie, Status } from "../../generated/prisma/client";
import type { CategorieWhereInput } from "../../generated/prisma/models";
import paginationOptions from "../../utils/pagination.util";

const getCategories = async (req: Request) => {
  const { status, search } = req.query;
  const { page, limit, skip, orderBy, order } = paginationOptions(req);

  const where: CategorieWhereInput = {
    ...(status && CategorieStatus.includes(status as string)
      ? {
          status: status as Status,
        }
      : {}),
    ...(search
      ? {
          name: {
            contains: search as string,
            mode: "insensitive",
          },
        }
      : {}),
  };

  const [categories, total] = await prisma.$transaction([
    prisma.categorie.findMany({
      skip,
      take: limit,
      where,
      orderBy: { [orderBy]: order },
      include: {
        children: {
          select: {
            name: true,
            slug: true,
          },
        },
        _count: {
          select: { children: true },
        },
      },
    }),
    prisma.categorie.count({ where }),
  ]);

  return { categories, meta: { page, limit, total } };
};

const getCategoriesList = async () => {
  const result = await prisma.categorie.findMany({
    where: { status: "published" },
    select: { id: true, name: true },
  });

  return result.map(({ id, name }) => ({
    id,
    label: name,
    value: name,
  }));
};

const getCategorie = async (categorieId: string) => {
  const result = await prisma.categorie.findUnique({
    where: { id: categorieId },
  });
  return result;
};

const createCategorie = async (payload: Categorie) => {
  const result = await prisma.categorie.create({ data: payload });
  return result;
};

const updateCategorie = async (categorieId: string, payload: Categorie) => {
  const result = await prisma.categorie.update({
    data: payload,
    where: { id: categorieId },
  });
  return result;
};

const deleteCategorie = async (categorieId: string) => {
  const result = await prisma.categorie.delete({ where: { id: categorieId } });
  return result;
};

export const categorieService = {
  createCategorie,
  updateCategorie,
  getCategorie,
  getCategories,
  getCategoriesList,
  deleteCategorie,
};
