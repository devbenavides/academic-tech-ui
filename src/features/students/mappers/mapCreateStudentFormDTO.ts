import type { CreateStudentRequest } from "../types/createStudentRequest";
import type { CreateStudentFormValues } from "../validation/type";

export const mapCreateStudentFormDTO = (
    data: CreateStudentFormValues,
): CreateStudentRequest => ({
    student: {
        firstName: data.student.firstName,
        middleName: data.student.middleName || undefined,
        lastName: data.student.lastName,
        secondLastName: data.student.secondLastName || undefined,
        enrollmentNumber: data.student.enrollmentNumber || undefined,
        dateOfBirth: data.student.dateOfBirth,
    },
    user: {
        idUser: data.user.idUser,
        username: data.user.username,
        email: data.user.email,
        password: data.user.password,
        roles: data.user.roles,
    },
});