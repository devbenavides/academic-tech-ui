import type { TeacherResponse } from "../types/teacherResponse";
import type { CreateTeacherFormValues } from "../validation/types";

export const mapResponseTeacherFormDTO = (
  data: TeacherResponse
): CreateTeacherFormValues => ({
  teacher: {
    firstName: data.firstName,
    lastName: data.lastName,
    specialty: data.specialty,
    middleName: data.middleName || undefined,
    secondLastName: data.secondLastName || undefined,
  },
  user: {
    idUser: data.user.idUser,
    username: data.user.username,
    email: data.user.email,
    password: data.user.password || undefined,
    roles: data.user.roles,
  },
});
