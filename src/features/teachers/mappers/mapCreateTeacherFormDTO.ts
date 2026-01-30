import type { CreateTeacherRequest } from "../types/createTeacherRequest";
import type { CreateTeacherFormValues } from "../validation/types";

export const mapCreateTeacherFormDTO = (
  data: CreateTeacherFormValues
): CreateTeacherRequest => ({
  teacher: {
    firstName: data.teacher.firstName,
    lastName: data.teacher.lastName,
    specialty: data.teacher.specialty,
    middleName: data.teacher.middleName || undefined,
    secondLastName: data.teacher.secondLastName || undefined,
  },
  user: {
    idUser: data.user.idUser,
    username: data.user.username,
    email: data.user.email,
    password: data.user.password || undefined,
    roles: data.user.roles,
  },
});
