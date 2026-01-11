import mongoose, { Schema, Document, Types } from "mongoose";
import { Student } from "../student/student.model";

export interface ISession extends Document {
  _id: Types.ObjectId;
  studentId: Types.ObjectId;
  sessionStart: Date;
  sessionEnd: Date;
  typingModeDuration: number;
  thinkingModeDuration: number;
  numberOfPauses: number;
  bursts: { start: number; end: number; duration: number }[];
  typingSpeed: number;
  typingConsistency: number;
  integrityStatus: "genuine" | "suspicious";
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new Schema<ISession>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    sessionStart: { type: Date, required: true },
    sessionEnd: { type: Date, required: true },
    typingModeDuration: { type: Number, required: true },
    thinkingModeDuration: { type: Number, required: true },
    numberOfPauses: { type: Number, required: true },
    bursts: [
      {
        start: { type: Number, required: true },
        end: { type: Number, required: true },
        duration: { type: Number, required: true },
      },
    ],
    typingSpeed: { type: Number, required: true },
    typingConsistency: { type: Number, required: true },
    integrityStatus: {
      type: String,
      enum: ["genuine", "suspicious"],
      required: true,
    },
  },
  { timestamps: true }
);

sessionSchema.post("save", async function (doc) {
  await Student.findByIdAndUpdate(doc.studentId, {
    $push: { sessions: doc._id },
  });
});

sessionSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Student.findByIdAndUpdate(doc.studentId, {
      $pull: { sessions: doc._id },
    });
  }
});

export const Session = mongoose.model<ISession>("Session", sessionSchema);
