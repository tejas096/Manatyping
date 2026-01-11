import { Request, Response, NextFunction } from "express";
import { ExpressError } from "../utils/ExpressError";

export const isTeacher = (req: Request, res: Response, next: NextFunction) => {
  if ((req as any).user.role !== "teacher") {
    return next(new ExpressError(403, "Access denied. Teacher only route."));
  }
  next();
};
