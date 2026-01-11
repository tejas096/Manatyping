import { studentRepository } from "./student.repository";
import bcrypt from "bcryptjs";
import { ExpressError } from "../../utils/ExpressError";
import { StudentLoginInput, StudentSignupInput } from "./student.validation";
import { IStudent } from "./student.model";
import { ISession } from "../session/session.model";

export const studentService = {
  createUser: async (studentData: StudentSignupInput): Promise<IStudent> => {
    const hashedPassword: string = await bcrypt.hash(studentData.password, 10);
    const user: IStudent = await studentRepository.create({
      ...studentData,
      password: hashedPassword,
    });
    return user;
  },

  loginCheck: async (studentData: StudentLoginInput): Promise<IStudent> => {
    const findStudent: IStudent | null = await studentRepository.findByEmail(
      studentData.email
    );
    if (!findStudent) throw new ExpressError(404, "User Not Found");

    const compare: boolean = await bcrypt.compare(
      studentData.password,
      findStudent.password
    );
    if (!compare) throw new ExpressError(500, "Wrong Password");
    return findStudent;
  },
  getAll: async (): Promise<any> => {
    const students: IStudent[] = await studentRepository.getAll();

    const studentStats = students.map((student) => {
      const sessions = student.sessions.filter(
        (s): s is ISession => typeof s !== "string" && "typingSpeed" in s
      );

      const totalSessions = sessions.length;

      const averageTypingSpeed =
        totalSessions > 0
          ? sessions.reduce((sum, s) => sum + s.typingSpeed, 0) / totalSessions
          : 0;

      const averageTypingConsistency =
        totalSessions > 0
          ? sessions.reduce((sum, s) => sum + s.typingConsistency, 0) /
            totalSessions
          : 0;

      const totalGenuine = sessions.filter(
        (s) => s.integrityStatus === "genuine"
      ).length;

      const totalSuspicious = sessions.filter(
        (s) => s.integrityStatus === "suspicious"
      ).length;

      return {
        studentId: student._id,
        name: student.name,
        email: student.email,
        averageTypingSpeed,
        averageTypingConsistency,
        totalGenuine,
        totalSuspicious,
        totalSessions,
      };
    });

    return studentStats;
  },
};
