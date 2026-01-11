import { Request, Response, NextFunction } from "express";
import { ExpressError } from "../utils/ExpressError";
import { ZodError } from "zod";
import multer from "multer";

export const HandleError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    err instanceof multer.MulterError ||
    err.message.includes("Invalid file type")
  ) {
    return res.status(400).json({
      message: err.message,
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation Failed",
      errors: err.issues.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      })),
    });
  }

  if (err instanceof ExpressError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  res.status(500).json({ message: err.message, error: err.stack });
};
