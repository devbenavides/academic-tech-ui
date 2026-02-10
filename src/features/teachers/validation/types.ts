import type { InferType } from "yup";
import type { createTeacherSchema } from ".";

//export type TeacherFormValues = InferType<typeof teacherSchema>;

export type CreateTeacherFormValues = InferType<typeof createTeacherSchema>;