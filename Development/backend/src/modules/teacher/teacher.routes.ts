import { Router } from "express";
import passport from "passport";
import { validate } from "../../middlewares/validate";
import { teacherLoginSchema, teacherSignupSchema } from "./teacher.validation";
import { tokenValidate } from "../../middlewares/tokenValidate";
import { teacherController } from "./teacher.controller";

const router = Router();

router.get("/", tokenValidate, teacherController.handleGetUser);

router.post(
  "/login",
  validate(teacherLoginSchema),
  teacherController.loginController
);

router.post(
  "/signup",
  validate(teacherSignupSchema),
  teacherController.signUpController
);

router.delete("/logout", tokenValidate, teacherController.logoutController);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  teacherController.googleHandle
);

export default router;
