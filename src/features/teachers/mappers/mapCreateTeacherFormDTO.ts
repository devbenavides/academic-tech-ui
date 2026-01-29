import type { CreateTeacherRequest } from "../types/createTeacherRequest";
import type { CreateTeacherFormValues } from "../validation/types";

export const mapCreateTeacherFormDTO = (
    data: CreateTeacherFormValues
): CreateTeacherRequest => ({
    teacher: {
        firstName: data.teacher.firstName ?? undefined,
        lastName: data.teacher.lastName,
        middleName: data.teacher.middleName ?? undefined,
        secondLastName: data.teacher.secondLastName ?? undefined,
        specialty: data.teacher.specialty,
    },
    user: {
        ...data.user
    },
});