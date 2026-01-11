import { Request, Response, NextFunction } from "express";
import { signToken } from "../../utils/signToken";
import { ExpressError } from "../../utils/ExpressError";
import { teacherSignupInput, teacherLoginInput } from "./teacher.validation";
import { teacherService } from "./teacher.service";
import { teacherRepository } from "./teacher.repository";
import { ITeacher } from "./teacher.model";

export const teacherController = {
  signUpController: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teacherData: teacherSignupInput = req.body;

      const duplicate: ITeacher | null = await teacherRepository.findByEmail(
        teacherData.email
      );
      if (duplicate) throw new ExpressError(409, "User Already Exist");

      const user: ITeacher = await teacherService.createUser(teacherData);
      const token = signToken(res, {
        email: user.email,
        id: user._id,
        role: user.role,
      });
      res.status(201).json({
        success: true,
        message: "User Created Successfully.",
        user,
        token: token,
      });
    } catch (err) {
      next(err);
    }
  },

  loginController: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teacherData: teacherLoginInput = req.body;

      const user: ITeacher = await teacherService.loginCheck(teacherData);
      const token = signToken(res, {
        id: user._id,
        email: user.email,
        role: user.role,
      });
      res.status(200).json({
        success: true,
        message: "User Login Successfully.",
        user,
        token: token,
      });
    } catch (err) {
      next(err);
    }
  },

  logoutController: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      });
      res
        .status(200)
        .json({ success: true, message: "User Logout Successfully." });
    } catch (err) {
      next(err);
    }
  },

  handleGetUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const email = (req as any).user.email;
      const user: ITeacher | null = await teacherRepository.findByEmail(email);
      res.status(200).json({ success: true, user });
    } catch (err) {
      next(err);
    }
  },

  googleHandle: (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user as any;
      signToken(res, {
        id: user._id,
        email: user.email,
        role: user.role,
      });
      res.redirect(`${process.env.CLIENT_URL}/outh-success`);
    } catch (err) {
      next(err);
    }
  },
};
