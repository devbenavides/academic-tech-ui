import { useState } from "react";
import type { CreateStudentFormValues } from "../validation/type";
import type { StudentResponse } from "../types/studentResponse";
import { mapCreateStudentFormDTO } from "../mappers/mapCreateStudentFormDTO";
import { updateStudent } from "../services/studentService";
import type { BackendErrorResponse } from "../../../shared/types/backendErrors";

export const useUpdateStudent = () => {
    const [loading, setLoading] = useState(false);

    const execute = async (id: number, payload: CreateStudentFormValues): Promise<StudentResponse | null> => {
        setLoading(true);
        try {
            const request = mapCreateStudentFormDTO(payload);
            return await updateStudent(id, request);
        } catch (err: any) {
            if (err?.response?.data) {
                const backendError = err.response.data as BackendErrorResponse;
                throw backendError;
            }
            throw err;
        }
        finally {
            setLoading(false);
        }
    };
    return { execute, loading };
};