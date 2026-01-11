import { Router } from "express";
import { validate } from "../../middlewares/validate";
import { tokenValidate } from "../../middlewares/tokenValidate";
import { sessionValidator } from "./session.validation";
import { sessionController } from "./session.controller";
import { isTeacher } from "../../middlewares/isTeacher";

const router = Router();

router
  .route("/")
  .post(
    tokenValidate,
    validate(sessionValidator),
    sessionController.createSession
  )
  .get(tokenValidate, sessionController.getStudentSession);

router.get(
  "/api/sessions/student/:studentId",
  tokenValidate,
  isTeacher,
  sessionController.getStudentSessionByID
);

router
  .route("/api/sessions/:id")
  .get(tokenValidate, sessionController.getSession)
  .delete(tokenValidate, sessionController.deleteSession);

export default router;
