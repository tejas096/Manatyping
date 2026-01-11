import { z } from "zod";
import { Types } from "mongoose";

const BurstSchema = z.object({
  start: z.number().nonnegative(),
  end: z.number().nonnegative(),
  duration: z.number().nonnegative(),
});

export const sessionValidator = z.object({
  sessionStart: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
  }, z.date()),
  sessionEnd: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
  }, z.date()),
  typingModeDuration: z.number().nonnegative(),
  thinkingModeDuration: z.number().nonnegative(),
  numberOfPauses: z.number().nonnegative(),
  bursts: z.array(BurstSchema),
  typingSpeed: z.number().nonnegative(),
  typingConsistency: z.number().nonnegative(),
  integrityStatus: z.enum(["genuine", "suspicious"]),
});

export type SessionValidateType = z.infer<typeof sessionValidator>;
