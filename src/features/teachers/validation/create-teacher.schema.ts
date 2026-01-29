import * as Yup from "yup";
import { teacherSchema, userSchema } from "../../../shared/validation";

export const createTeacherSchema =
  Yup.object({
    teacher: teacherSchema.required(),
    user: userSchema.required(),
  }).required();