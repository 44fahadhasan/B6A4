import type { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/send-response.util";
import { categorieService } from "./categorie.service";

const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await categorieService.getCategories(req);

    sendResponse(res, {
      message: "Categories get!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getCategoriesList = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await categorieService.getCategoriesList();

    sendResponse(res, {
      message: "Categories list get!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getCategorie = async (
  req: Request<{ categorieId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await categorieService.getCategorie(req.params.categorieId);

    sendResponse(res, {
      statusCode: 200,
      message: "Categorie get!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const createCategorie = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await categorieService.createCategorie(req.body);

    sendResponse(res, {
      statusCode: 201,
      message: "Categorie created!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const updateCategorie = async (
  req: Request<{ categorieId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      params: { categorieId },
      body,
    } = req;

    const data = await categorieService.updateCategorie(categorieId, body);

    sendResponse(res, {
      message: "Categorie updated!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategorie = async (
  req: Request<{ categorieId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await categorieService.deleteCategorie(req.params.categorieId);

    sendResponse(res, {
      message: "Categorie deleted!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const categorieController = {
  createCategorie,
  updateCategorie,
  getCategorie,
  getCategories,
  getCategoriesList,
  deleteCategorie,
};
