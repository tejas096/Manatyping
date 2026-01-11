import { IStudent, Student } from "./student.model";
import { StudentSignupInput } from "./student.validation";

export const studentRepository = {
  create: async (studentData: StudentSignupInput): Promise<IStudent> => {
    return await Student.create(studentData);
  },
  findByEmail: async (email: string): Promise<IStudent | null> => {
    return await Student.findOne({ email });
  },
  findById: async (id: string): Promise<IStudent | null> => {
    return await Student.findById(id);
  },

  getAll: async (): Promise<IStudent[]> => {
    return await Student.find().populate({
      path: "sessions",
      select: "typingSpeed typingConsistency integrityStatus -_id",
    });
  },
};
