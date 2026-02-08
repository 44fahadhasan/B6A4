import type { NextFunction, Request, Response } from "express";
import sendResponse from "../utils/send-response.util";

export default function globalError(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error("Error=>", err);

  let statusCode = 500;
  let message = err.message || "Internal server error";

  sendResponse(res, {
    success: false,
    statusCode,
    message,
    data: null,
  });
}
