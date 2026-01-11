import mongoose from "mongoose";
import { ExpressError } from "../utils/ExpressError";

export const connectDB = async (): Promise<void> => {
  try {
    const connect_url: string = process.env.CONNECTURL || "";
    if (!connect_url) throw new ExpressError(500, "Connection URL not found");
    await mongoose.connect(connect_url);
    console.log("Connection Succesfull");
  } catch (err) {
    console.log("Failed" + err);
    process.exit(1);
  }
};
