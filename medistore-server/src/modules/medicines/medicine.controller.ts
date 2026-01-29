import type { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/send-response.util";
import { medicineService } from "./medicine.service";

const getMedicines = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await medicineService.getMedicines(req);

    sendResponse(res, {
      message: "Medicines get!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getMedicinesForAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await medicineService.getMedicinesForAdmin(req);

    sendResponse(res, {
      message: "Medicines get!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getMedicine = async (
  req: Request<{ medicineId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await medicineService.getMedicine(req.params.medicineId);

    sendResponse(res, {
      statusCode: 201,
      message: "Medicine get!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const createMedicine = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await medicineService.createMedicine(req.body);

    sendResponse(res, {
      statusCode: 201,
      message: "Medicine created!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const updateMedicine = async (
  req: Request<{ medicineId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      params: { medicineId },
      body,
    } = req;

    const data = await medicineService.updateMedicine(medicineId, body);

    sendResponse(res, {
      message: "Medicine updated!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const deleteMedicine = async (
  req: Request<{ medicineId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await medicineService.deleteMedicine(req.params.medicineId);

    sendResponse(res, {
      message: "Medicine deleted!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const medicineController = {
  createMedicine,
  updateMedicine,
  getMedicine,
  getMedicines,
  getMedicinesForAdmin,
  deleteMedicine,
};
