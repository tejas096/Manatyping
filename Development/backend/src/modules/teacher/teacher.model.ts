import mongoose, { Schema, Types, model } from "mongoose";

export interface ITeacher extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "teacher";
  createdAt: Date;
  updatedAt: Date;
}

const teacherSchema = new Schema<ITeacher>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      default: "teacher",
      immutable: true,
      required: true,
    },
  },
  { timestamps: true }
);
export const Teacher = mongoose.model<ITeacher>("Teacher", teacherSchema);
