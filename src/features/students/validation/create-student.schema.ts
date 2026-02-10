import * as Yup from "yup";
import { studentSchema } from "./student.schema";
import { userSchema } from "../../../shared/validation";

export const createStudentSchema = Yup.object({
    student: studentSchema.required(),
    user: userSchema.required(),
}).required();