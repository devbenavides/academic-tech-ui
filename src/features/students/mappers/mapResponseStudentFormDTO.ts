import type { StudentResponse } from "../types/studentResponse";
import type { CreateStudentFormValues } from "../validation/type";

export const mapResponseStudentFormDTO = (
  data: StudentResponse,
): CreateStudentFormValues => ({
  student: {
    firstName: data.firstName,
    lastName: data.lastName,
    middleName: data.middleName,
    secondLastName: data.secondLastName,
    enrollmentNumber: data.enrollmentNumber,
    dateOfbirth: data.dateOfbirth,
  },
  user: {
    idUser: data.user.idUser,
    username: data.user.username,
    email: data.user.email,
    roles: data.user.roles,
  },
});