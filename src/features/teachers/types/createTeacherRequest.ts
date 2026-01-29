import type { UserRequest } from "../../users/types/userRequest";
import type { TeacherRequest } from "./teacherRequest";

export interface CreateTeacherRequest {
    teacher: TeacherRequest;
    user: UserRequest;
}