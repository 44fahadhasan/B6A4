import type { NextFunction, Request, Response } from "express";
import { Prisma } from "../generated/prisma/client";
import sendResponse from "../utils/send-response.util";

export default function globalError(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error("Error =>", err);

  let statusCode = 500;
  let message = "Internal server error";
  let data: any = null;

  // Prisma Known Errors (P2000 - P2025)
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2000":
        statusCode = 400;
        message = "Input value is too long";
        break;

      case "P2001":
        statusCode = 404;
        message = "Record not found";
        break;

      case "P2002":
        statusCode = 409;
        message = "Duplicate record exists";
        break;

      case "P2003":
        statusCode = 400;
        message = "Invalid relation";
        break;

      case "P2004":
        statusCode = 400;
        message = "Database constraint failed";
        break;

      case "P2011":
        statusCode = 400;
        message = "Null constraint violation";
        break;

      case "P2012":
        statusCode = 400;
        message = "Missing required field";
        break;

      case "P2014":
        statusCode = 400;
        message = "Relation violation";
        break;

      case "P2025":
        statusCode = 404;
        message = "Record not found";
        break;

      default:
        statusCode = 400;
        message = "Invalid database request";
        break;
    }
  }

  // Prisma Transaction Timeout / Pool Exhausted
  else if (
    typeof err?.message === "string" &&
    err.message.includes("Unable to start a transaction")
  ) {
    statusCode = 503;
    message = "Database is busy. Please try again shortly.";
  }

  // Prisma Validation Error
  else if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    message = "Invalid input data";
    data = err.message;
  }

  // Prisma Connection Error
  else if (err instanceof Prisma.PrismaClientInitializationError) {
    statusCode = 500;
    message = "Database connection failed";
  }

  // Prisma Engine Crash
  else if (err instanceof Prisma.PrismaClientRustPanicError) {
    statusCode = 500;
    message = "Critical database engine error";
  }

  // Custom App Errors
  else if (err.statusCode) {
    statusCode = err.statusCode;
    message = err.message;
    data = err.data || null;
  }

  // Generic JS Error
  else if (err instanceof Error) {
    message = err.message;
  }

  sendResponse(res, {
    success: false,
    statusCode,
    message,
    data,
  });
}
