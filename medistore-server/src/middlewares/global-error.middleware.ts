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

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2000":
        statusCode = 400;
        message = "Input value is too long for the field";
        break;

      case "P2001":
        statusCode = 404;
        message = "Record does not exist";
        break;

      case "P2002":
        statusCode = 409;
        message = "Duplicate record exists. Please provide unique values.";
        break;

      case "P2003":
        statusCode = 400;
        message = "Invalid relation. Foreign key constraint failed";
        break;

      case "P2004":
        statusCode = 400;
        message = "A database constraint failed";
        break;

      case "P2011":
        statusCode = 400;
        message = "Null constraint violation";
        break;

      case "P2012":
        statusCode = 400;
        message = "Missing required value";
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
        message = err.message;
        break;
    }
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    message = "Invalid input data";
    data = err.message;
  } else if (err instanceof Prisma.PrismaClientInitializationError) {
    statusCode = 500;
    message = "Database connection failed";
  } else if (err instanceof Prisma.PrismaClientRustPanicError) {
    statusCode = 500;
    message = "Critical database engine error";
  } else if (err.statusCode) {
    statusCode = err.statusCode;
    message = err.message;
    data = err.data || null;
  } else if (err instanceof Error) {
    message = err.message;
  }

  sendResponse(res, {
    success: false,
    statusCode,
    message,
    data,
  });
}
