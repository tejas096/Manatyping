import { teacherRepository } from "./teacher.repository";
import bcrypt from "bcryptjs";
import { ExpressError } from "../../utils/ExpressError";
import { teacherLoginInput, teacherSignupInput } from "./teacher.validation";
import { ITeacher } from "./teacher.model";

export const teacherService = {
  createUser: async (teacherData: teacherSignupInput): Promise<ITeacher> => {
    const hashedPassword: string = await bcrypt.hash(teacherData.password, 10);
    const user: ITeacher = await teacherRepository.create({
      ...teacherData,
      password: hashedPassword,
    });
    return user;
  },

  loginCheck: async (teacherData: teacherLoginInput): Promise<ITeacher> => {
    const findTeacher: ITeacher | null = await teacherRepository.findByEmail(
      teacherData.email
    );
    if (!findTeacher) throw new ExpressError(404, "User Not Found");

    const compare: boolean = await bcrypt.compare(
      teacherData.password,
      findTeacher.password
    );
    if (!compare) throw new ExpressError(500, "Wrong Password");
    return findTeacher;
  },
};
