import type { InferType } from "yup";
import type { createStudentSchema } from "./create-student.schema";

export type CreateStudentFormValues = InferType<typeof createStudentSchema>;