import type { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/send-response.util";
import { pharmacieService } from "./pharmacie.service";

const getPharmaciesForSeller = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await pharmacieService.getPharmaciesForSeller(req);

    sendResponse(res, {
      message: "Pharmacies get!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getPharmaciesForAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await pharmacieService.getPharmaciesForAdmin(req);

    sendResponse(res, {
      message: "Pharmacies get!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getPharmacie = async (
  req: Request<{ pharmacieId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await pharmacieService.getPharmacie(req.params.pharmacieId);

    sendResponse(res, {
      message: "Pharmacie get!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getPharmacieForAdmin = async (
  req: Request<{ pharmacieId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await pharmacieService.getPharmacieForAdmin(
      req.params.pharmacieId,
    );

    sendResponse(res, {
      message: "Pharmacie get!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const createPharmacie = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user, body } = req;

    if (!user?.id) {
      throw new Error("User id is required");
    }

    const data = await pharmacieService.createPharmacie({
      ...body,
      ownerId: user?.id,
    });

    sendResponse(res, {
      statusCode: 201,
      message: "Pharmacie created!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const updatePharmacie = async (
  req: Request<{ pharmacieId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      params: { pharmacieId },
      body,
    } = req;

    const data = await pharmacieService.updatePharmacie(pharmacieId, body);

    sendResponse(res, {
      message: "Pharmacie updated!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const deletePharmacie = async (
  req: Request<{ pharmacieId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await pharmacieService.deletePharmacie(req.params.pharmacieId);

    sendResponse(res, {
      message: "Pharmacie deleted!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const pharmacieController = {
  createPharmacie,
  updatePharmacie,
  getPharmacie,
  getPharmaciesForSeller,
  getPharmacieForAdmin,
  getPharmaciesForAdmin,
  deletePharmacie,
};
