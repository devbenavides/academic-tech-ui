import * as Yup from "yup";
import { emailValidation, passwordValidation, requiredString } from "../../common";

export const userSchema = Yup.object()
    .shape({
        idUser: Yup.number().optional(),

        username: requiredString("El usuario es obligatorio")
            .min(4, "Mínimo 3 caracteres")
            .max(30, "Máximo 30 caracteres"),

        email: emailValidation,

        password: Yup.string()
            .nullable()
            .transform((value) => (value === "" ? null : value))
            .when("idUser", {
                is: (value: number | undefined) => !value,
                then: () => passwordValidation, // crear → obligatorio
                otherwise: (schema) => schema.notRequired(), // editar → opcional
            }),

        confirmPassword: Yup.string()
            .nullable()
            .transform((value) => (value === "" ? null : value))
            .when("password", {
                is: (password: string | null | undefined) => !!password,
                then: (schema) =>
                    schema
                        .required("Debe confirmar la contraseña")
                        .oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
                otherwise: (schema) => schema.notRequired(),
            }),

        roles: Yup.array()
            .of(Yup.string().required())
            .min(1, "Debe tener al menos un rol")
            .required("Debe tener al menos un rol"),
    })
    .required();