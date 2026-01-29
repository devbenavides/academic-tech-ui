import type { UserRequest } from "../../users/types/userRequest";

export interface TeacherResponse{
    idTeacher: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    secondLastName?: string;
    specialty: string;
    user: UserRequest;
}