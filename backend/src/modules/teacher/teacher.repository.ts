import { ITeacher, Teacher } from "./teacher.model";
import { teacherSignupInput } from "./teacher.validation";

export const teacherRepository = {
  create: async (teacherData: teacherSignupInput): Promise<ITeacher> => {
    return await Teacher.create(teacherData);
  },
  findByEmail: async (email: string): Promise<ITeacher | null> => {
    return await Teacher.findOne({ email });
  },
  findById: async (id: string): Promise<ITeacher | null> => {
    return await Teacher.findById(id);
  },
};
