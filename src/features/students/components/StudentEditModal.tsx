import { useState } from "react";
import type { BackendFieldErrors } from "../../../shared/types/backendErrors";
import type { CreateStudentFormValues } from "../validation/type";
import { toastService } from "../../../shared/services/toastService";
import { StudentForm } from "./StudentForm";
import type { StudentResponse } from "../types/studentResponse";
import { useUpdateStudent } from "../hooks/useUpdateStudent";
import { mapResponseStudentFormDTO } from "../mappers/mapResponseStudentFormDTO";

type Props = {
  student: StudentResponse;
  onClose: () => void;
  onSuccess: () => void;
};
export const StudentEditModal = ({ student, onClose, onSuccess }: Props) => {
  const { execute: updateStudent, loading } = useUpdateStudent();
  const [backendErrors, setBackendErrors] = useState<BackendFieldErrors | null>(
    null,
  );

  const handleUpdate = async (data: CreateStudentFormValues) => {
    setBackendErrors(null);

    try {
      await updateStudent(student.idStudent, data);
      onSuccess();
      toastService.success("Estudiante actualizado exitosamente");
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
              <StudentForm
                initialValues={mapResponseStudentFormDTO(student)}
                backendErrors={backendErrors ?? undefined}
                onSubmit={handleUpdate}
              />

              {loading && <p className="mt-2">Creando...</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div className="modal-backdrop fade show"></div>
    </>
  );
};
