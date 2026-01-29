import * as Yup from "yup";

export const requiredString = (message = "Campo obligatorio") =>
    Yup.string().trim().required(message);

export const emailValidation = Yup.string()
    .email("Email inválido")
    .required("El email es obligatorio");

export const passwordValidation = Yup.string()
  .required("La contraseña es obligatoria")
  .min(6, "Mínimo 6 caracteres")
  //.matches(/[a-z]/, "Debe contener al menos una letra minúscula")
  //.matches(/[A-Z]/, "Debe contener al menos una letra mayúscula")
  //.matches(/\d/, "Debe contener al menos un número")
  //.matches(/[@$!%*?&]/, "Debe contener al menos un carácter especial (@, $, !, %, *, ?, &)")
  ;