import { Router } from "express";
import passport from "passport";
import { validate } from "../../middlewares/validate";
import { studentLoginSchema, studentSignupSchema } from "./student.validation";
import { tokenValidate } from "../../middlewares/tokenValidate";
import { studentController } from "./student.controller";
import { isTeacher } from "../../middlewares/isTeacher";

const router = Router();

router.get("/", tokenValidate, studentController.handleGetUser);

router.get(
  "/studentDetails",
  tokenValidate,
  isTeacher,
  studentController.getAllStudents
);

router.post(
  "/login",
  validate(studentLoginSchema),
  studentController.loginController
);

router.post(
  "/signup",
  validate(studentSignupSchema),
  studentController.signUpController
);

router.delete("/logout", tokenValidate, studentController.logoutController);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  studentController.googleHandle
);

export default router;
