import { useState } from "react";
import { useCreateTeacher } from "../hooks/useCreateTeacher";
import type { TeacherResponse } from "../types/teacherResponse";
import type { BackendFieldErrors } from "../../../shared/types/backendErrors";
import type { CreateTeacherFormValues } from "../validation/types";
import { toastService } from "../../../shared/services/toastService";
import { updateTeacher } from "../services/teacherService";
import { mapCreateTeacherFormDTO } from "../mappers/mapCreateTeacherFormDTO";
import { TeacherForm } from "./TeacherForm";
import { useUpdateTeacher } from "../hooks/useUpdateTeacher";
import { mapResponseTeacherFormDTO } from "../mappers/mapResponseTeacherFormDTO";

type Props = {
  teacher: TeacherResponse;
  onClose: () => void;
  onSuccess: () => void;
};

export const TeacherEditModal = ({ teacher, onClose, onSuccess }: Props) => {
  const { execute: updateTeacher, loading } = useUpdateTeacher();
  const [backendErrors, setBackendErrors] = useState<BackendFieldErrors | null>(null);

  const handleUpdate = async (data: CreateTeacherFormValues) => {
    setBackendErrors(null);

    try {
      await updateTeacher(teacher.idTeacher, data);
      onSuccess();
      toastService.success("Profesor actualizado exitosamente");
      onClose();
    } catch (err: any) {
      const fieldErrors = err?.fieldErrors;

      if (fieldErrors) {
        setBackendErrors(fieldErrors);
      } else {
        alert(err?.message || "Error desconocido");
      }
    }
  };

  return (
    <>
      <div className="modal fade show d-block" tabIndex={-1}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Crear Profesor</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => onClose()}
              />
            </div>

            <div className="modal-body">
              <TeacherForm
                initialValues={mapResponseTeacherFormDTO(teacher)}
                backendErrors={backendErrors ?? undefined}
                onSubmit={handleUpdate}
              />

              {loading && <p className="mt-2">Actualizando...</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div className="modal-backdrop fade show"></div>
    </>
  );
};
