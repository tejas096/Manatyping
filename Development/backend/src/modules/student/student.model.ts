import mongoose, { Schema, Types } from "mongoose";
import { ISession, Session } from "../session/session.model";

export interface IStudent extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "student";
  sessions: (Types.ObjectId | ISession)[];
  createdAt: Date;
  updatedAt: Date;
}

const studentSchema = new Schema<IStudent>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      default: "student",
      immutable: true,
      required: true,
    },
    sessions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Session",
      },
    ],
  },
  { timestamps: true }
);

studentSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function () {
    const student = this;
    await Session.deleteMany({ studentId: student._id });
  }
);

export const Student = mongoose.model<IStudent>("Student", studentSchema);
