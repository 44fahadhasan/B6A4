import type { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/send-response.util";
import { inventoreiservice } from "./inventory.service";

const getInventoreis = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await inventoreiservice.getInventoreis(req);

    sendResponse(res, {
      message: "Inventoreis get!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const createInventory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user, body } = req;

    if (!user?.pharmacieId) {
      throw new Error("Pharmacie id is required");
    }

    const data = await inventoreiservice.createInventory({
      ...body,
      pharmacieId: user?.pharmacieId,
    });

    sendResponse(res, {
      statusCode: 201,
      message: "Inventory created!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const updateInventory = async (
  req: Request<{ inventoryId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      params: { inventoryId },
      body,
    } = req;

    const data = await inventoreiservice.updateInventory(inventoryId, body);

    sendResponse(res, {
      message: "Inventory updated!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const deleteInventory = async (
  req: Request<{ inventoryId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await inventoreiservice.deleteInventory(
      req.params.inventoryId,
    );

    sendResponse(res, {
      message: "Inventory deleted!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const inventoryController = {
  getInventoreis,
  createInventory,
  updateInventory,
  deleteInventory,
};
