import type { UserRequest } from "../../users/types/userRequest";
import type { StudentRequest } from "./studentRequest";

export interface CreateStudentRequest{
    student: StudentRequest;
    user: UserRequest;
}