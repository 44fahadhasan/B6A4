import type { NextFunction, Request, Response } from "express";
import sendResponse from "../utils/send-response.util";

export function notFound(req: Request, res: Response, next: NextFunction) {
  const message = `API route not found: ${req.method} ${req.originalUrl}`;

  sendResponse(res, {
    success: false,
    message,
  });
}
