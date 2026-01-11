import { ExpressError } from "../../utils/ExpressError";
import { SessionValidateType } from "./session.validation";
import { ISession } from "./session.model";
import { sessionRepository } from "./session.repository";
import { studentRepository } from "../student/student.repository";
import { IStudent } from "../student/student.model";

export const sessionService = {
  createSession: async (
    sessionData: SessionValidateType,
    studentId: string
  ): Promise<ISession> => {
    const studentExists: IStudent | null = await studentRepository.findById(
      studentId
    );
    if (!studentExists) throw new ExpressError(404, "Student Not Found");
    const result: ISession = await sessionRepository.create(
      sessionData,
      studentId
    );
    if (!result) throw new ExpressError(404, "Session Not Found");
    return result;
  },

  sendStudentSession: async (studentId: string): Promise<ISession[]> => {
    const studentExists: IStudent | null = await studentRepository.findById(
      studentId
    );
    if (!studentExists) throw new ExpressError(404, "Student Not Found");
    const result: ISession[] = await sessionRepository.sendAllSessions(
      studentId
    );
    if (!result) throw new ExpressError(404, "Session Not Found");
    return result;
  },

  sendSession: async (id: string): Promise<ISession> => {
    const result: ISession | null = await sessionRepository.sendSessions(id);
    if (!result) throw new ExpressError(404, "Session Not Found");
    return result;
  },

  deleteSession: async (id: string): Promise<ISession> => {
    const result: ISession | null = await sessionRepository.deleteSessions(id);
    if (!result) throw new ExpressError(404, "Session Not Found");
    return result;
  },
};
