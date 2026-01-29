import * as Yup from "yup";
import { emailValidation, passwordValidation, requiredString } from "../../common";

export const userSchema = Yup.object()
    .shape({
        idUser: Yup.number().optional(),

        username: requiredString("El usuario es obligatorio")
            .min(4, "Mínimo 3 caracteres")
            .max(30, "Máximo 30 caracteres"),

        email: emailValidation,

        password: Yup.string().when("idUser", {
            // Crear → no hay idUser → password obligatorio
            is: (value: number | undefined) => !value,
            then: () => passwordValidation,
            // Editar → hay idUser → password opcional
            otherwise: () => Yup.string().optional(),
        }),
        roles: Yup.array()
            .of(Yup.string().required())
            .min(1, "Debe tener al menos un rol")
            .required("Debe tener al menos un rol"),
    })
    .required();