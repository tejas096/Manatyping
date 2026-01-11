import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { HandleError } from "./middlewares/HandleError";
import { PageNotFound } from "./middlewares/PageNotFound";
import student from "./modules/student/student.routes";
import teacher from "./modules/teacher/teacher.routes";
import session from "./modules/session/session.routes";
import passport from "passport";
import "./config/passport";

const app = express();

app.use(compression());
app.use(passport.initialize());
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/student", student);
app.use("/api/teacher", teacher);
app.use("/api/session", session);

app.use(PageNotFound);
app.use(HandleError as ErrorRequestHandler);

export default app;
