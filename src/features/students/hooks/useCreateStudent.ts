import { useState } from "react";
import type { CreateStudentFormValues } from "../validation/type";
import type { StudentResponse } from "../types/studentResponse";
import { createStudent } from "../services/studentService";
import { mapCreateStudentFormDTO } from "../mappers/mapCreateStudentFormDTO";
import type { BackendErrorResponse } from "../../../shared/types/backendErrors";

export const useCreateStudent = () =>{
    const [loading, setLoading] = useState(false);

    const mutate = async (payload: CreateStudentFormValues): Promise<StudentResponse> => {
        setLoading(true);
        try {
            const student = await createStudent(mapCreateStudentFormDTO(payload));
            return student;
        } catch (err:any) {
            if(err?.response?.data){
                const backendError = err.response.data as BackendErrorResponse;
                throw backendError;
            }
            throw err;
        }finally{
            setLoading(false);
        }
    };
    return {mutate, loading};
};