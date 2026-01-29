// src/features/teachers/pages/CreateTeacher.tsx
import { useState } from "react";
import { TeacherForm } from "../components/TeacherForm";
import { useCreateTeacher } from "../hooks/useCreateTeacher";
import type { CreateTeacherFormValues } from "../validation/types";
import type { BackendFieldErrors } from "../../../shared/types/backendErrors";

export const TeacherCreatePage = () => {
  const { mutate, loading } = useCreateTeacher();
  const [backendErrors, setBackendErrors] = useState<BackendFieldErrors | null>(null);

  const handleCreate = async (data: CreateTeacherFormValues) => {
  setBackendErrors(null);

  try {
    await mutate(data);
    alert('Profesor creado exitosamente');
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
      <h1>Crear Profesor</h1>
      <TeacherForm onSubmit={handleCreate} backendErrors={backendErrors ?? undefined} />
      {loading && <p>Creando...</p>}
    </div>
  );
};