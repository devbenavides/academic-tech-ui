// src/features/teachers/pages/CreateTeacher.tsx
import { useState } from "react";
import { TeacherForm } from "./TeacherForm";
import { useCreateTeacher } from "../hooks/useCreateTeacher";
import type { CreateTeacherFormValues } from "../validation/types";
import type { BackendFieldErrors } from "../../../shared/types/backendErrors";
import { toastService } from "../../../shared/services/toastService";

type Props = {
  onSuccess:() => void;
};
export const TeacherCreateModal = ({onSuccess}:Props) => {
  const { mutate, loading } = useCreateTeacher();
  const [backendErrors, setBackendErrors] = useState<BackendFieldErrors | null>(null);
  const [showModal,setShowModal] = useState(false);

  const handleCreate = async (data: CreateTeacherFormValues) => {
  setBackendErrors(null);

  try {
    await mutate(data);
    onSuccess();
    toastService.success('Profesor creado exitosamente');
    setShowModal(false);
  } catch (err: any) {
    //Capturamos fieldErrors del backend
    const fieldErrors = err?.fieldErrors;
    console.log('FIELD ERRORS DEL BACKEND', fieldErrors);

    if (fieldErrors) {
      setBackendErrors(fieldErrors);
    } else {
      alert(err?.message || 'Error desconocido');
    }
  }
};

return (
    <div>
      <button
        className="btn btn-primary"
        onClick={() => setShowModal(true)}
      >
        + Nuevo Profesor
      </button>
      
      {/* MODAL */}
      {showModal && (
        <>
          <div className="modal fade show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Crear Profesor</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  />
                </div>

                <div className="modal-body">
                  <TeacherForm
                    onSubmit={handleCreate}
                    backendErrors={backendErrors ?? undefined}
                  />

                  {loading && <p className="mt-2">Creando...</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Backdrop */}
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
};