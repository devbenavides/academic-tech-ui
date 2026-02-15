import { useState } from "react";
import { useCreateStudent } from "../hooks/useCreateStudent";
import type { BackendFieldErrors } from "../../../shared/types/backendErrors";
import type { CreateStudentFormValues } from "../validation/type";
import { toastService } from "../../../shared/services/toastService";
import { StudentForm } from "./StudentForm";

type Props = {
  onSuccess:() => void;
};
export const StudentCreateModal = ({onSuccess}:Props) => {
  const { mutate, loading } = useCreateStudent();
  const [backendErrors, setBackendErrors] = useState<BackendFieldErrors | null>(null);
  const [showModal,setShowModal] = useState(false);

  const handleCreate = async (data: CreateStudentFormValues) => {
  setBackendErrors(null);

  try {
    await mutate(data);
    onSuccess();
    toastService.success('Estudiante creado exitosamente');
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
        + Nuevo Estudiante
      </button>
      
      {/* MODAL */}
      {showModal && (
        <>
          <div className="modal fade show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Crear Estudiante</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  />
                </div>

                <div className="modal-body">
                  <StudentForm
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