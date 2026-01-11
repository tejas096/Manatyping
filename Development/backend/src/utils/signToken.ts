import jwt from "jsonwebtoken";
import { Response } from "express";
export const signToken = (res: Response, user: object) => {
  const secret: string = process.env.SECRET || "DEFAULT SECRET";
  const token = jwt.sign(user, secret, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 1000 * 7 * 24 * 60 * 60,
  });

  return token;
};
