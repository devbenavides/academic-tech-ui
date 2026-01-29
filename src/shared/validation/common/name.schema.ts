import * as Yup from "yup";
import { requiredString } from "./common.validation";

export const personNameSchema = {
    firstName: requiredString("El nombre es obligatorio")
        .min(2, "Mínimo 2 caracteres")
        .max(50),

    middleName: Yup.string()
        .trim()
        .notRequired(),

    lastName: requiredString("El apellido es obligatorio")
        .min(2, "Mínimo 2 caracteres")
        .max(50),

    secondLastName: Yup.string()
        .trim()
        .notRequired(),
};