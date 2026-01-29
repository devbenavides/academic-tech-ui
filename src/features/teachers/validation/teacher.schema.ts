import * as Yup from "yup";
import { personNameSchema } from "../../../shared/validation/common/name.schema";

export const teacherSchema = Yup.object({
        ...personNameSchema,
        specialty: Yup.string()
            .required("La especialidad es obligatoria")
            .min(3, "Mínimo 3 caracteres")
            .max(100, "Máximo 100 caracteres"),
    });