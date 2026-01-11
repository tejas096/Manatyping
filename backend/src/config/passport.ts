import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Student } from "../modules/student/student.model";
import { Teacher } from "../modules/teacher/teacher.model";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: "/api/student/google/callback",
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const existingStudent = await Student.findOne({
          email: profile.emails?.[0].value,
        });
        if (existingStudent) return done(null, existingStudent);

        const existingTeacher = await Teacher.findOne({
          email: profile.emails?.[0].value,
        });
        if (existingTeacher) return done(null, existingTeacher);

        const newUser = await Student.create({
          name: profile.displayName,
          email: profile.emails?.[0].value,
          password: process.env.SECRET,
        });

        done(null, newUser);
      } catch (err) {
        done(err as any);
      }
    }
  )
);
