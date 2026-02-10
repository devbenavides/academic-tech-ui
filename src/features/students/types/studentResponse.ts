import type { UserResponse } from "../../users/types/userResponse";

export interface StudentResponse{
    idStudent: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    secondLastName?: string;
    enrollmentNumber?: string;
    dateOfbirth: string;
    user: UserResponse;
}