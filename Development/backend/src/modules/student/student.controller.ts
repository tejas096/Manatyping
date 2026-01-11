import { Request, Response, NextFunction } from "express";
import { signToken } from "../../utils/signToken";
import { ExpressError } from "../../utils/ExpressError";
import { StudentLoginInput, StudentSignupInput } from "./student.validation";
import { studentService } from "./student.service";
import { studentRepository } from "./student.repository";
import { IStudent } from "./student.model";

export const studentController = {
  signUpController: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const studentData: StudentSignupInput = req.body;

      const duplicate: IStudent | null = await studentRepository.findByEmail(
        studentData.email
      );
      if (duplicate) throw new ExpressError(409, "User Already Exist");

      const user: IStudent = await studentService.createUser(studentData);
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
      const studentData: StudentLoginInput = req.body;

      const user: IStudent = await studentService.loginCheck(studentData);
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

  getAllStudents: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const students: IStudent[] = await studentService.getAll();
      res.status(200).json({
        success: true,
        students,
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
      const user: IStudent | null = await studentRepository.findByEmail(email);
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
