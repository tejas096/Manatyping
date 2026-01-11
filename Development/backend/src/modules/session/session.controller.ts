import { Request, Response, NextFunction } from "express";
import { SessionValidateType } from "./session.validation";
import { ISession } from "./session.model";
import { sessionService } from "./session.service";

export const sessionController = {
  createSession: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sessionData: SessionValidateType = req.body;
      const session: ISession = await sessionService.createSession(
        sessionData,
        (req as any).user.id
      );
      return res.status(201).json({ success: true, session });
    } catch (err) {
      next(err);
    }
  },

  getStudentSession: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const sessions: ISession[] = await sessionService.sendStudentSession(
        (req as any).user.id
      );
      return res.status(200).json({
        success: true,
        count: sessions.length,
        sessions,
      });
    } catch (err) {
      next(err);
    }
  },

  getStudentSessionByID: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const studentID: string = req.params.studentID as string;
      const sessions: ISession[] = await sessionService.sendStudentSession(
        studentID
      );
      return res.status(200).json({
        success: true,
        count: sessions.length,
        sessions,
      });
    } catch (err) {
      next(err);
    }
  },

  getSession: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id as string;
      const sessions: ISession = await sessionService.sendSession(id);
      return res.status(200).json({
        success: true,
        sessions,
      });
    } catch (err) {
      next(err);
    }
  },

  deleteSession: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id as string;
      await sessionService.deleteSession(id);
      return res.status(200).json({
        success: true,
        message: "Session Deleted",
      });
    } catch (err) {
      next(err);
    }
  },
};
