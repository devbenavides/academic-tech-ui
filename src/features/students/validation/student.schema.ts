import * as Yup from "yup";
import { personNameSchema } from "../../../shared/validation";

export const studentSchema = Yup.object({
    ...personNameSchema,
    enrollmentNumber: Yup.string()
    .notRequired(),
    
    dateOfbirth: Yup.string()
    .required("Ingrese la fecha de nacimiento")
});