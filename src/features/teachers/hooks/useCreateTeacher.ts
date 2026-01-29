import { useState } from "react";
import { createTeacher } from "../services/teacherService";
import type { CreateTeacherFormValues } from "../validation/types";
import { mapCreateTeacherFormDTO } from "../mappers/mapCreateTeacherFormDTO";
import type { BackendErrorResponse } from "../../../shared/types/backendErrors";
import type { TeacherResponse } from "../types/teacherResponse";

export const useCreateTeacher = () => {
  const [loading, setLoading] = useState(false);

  const mutate = async (payload: CreateTeacherFormValues): Promise<TeacherResponse> => {
    setLoading(true);

    try {
      const teacher = await createTeacher(mapCreateTeacherFormDTO(payload));
      return teacher;
    } catch (err: any) {
      if (err?.response?.data) {
        const backendError = err.response.data as BackendErrorResponse;
        throw backendError;
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading };
};