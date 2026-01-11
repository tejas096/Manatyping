import { Request, Response, NextFunction } from "express";
import { ExpressError } from "../utils/ExpressError";
export const PageNotFound = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(new ExpressError(404, "Page Not Found"));
};
