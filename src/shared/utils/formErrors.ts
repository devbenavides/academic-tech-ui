import type { FieldValues, UseFormSetError } from "react-hook-form";


/**
 * Mapea los errores del backend a React Hook Form.
 *
 * @param fieldErrors - Objeto devuelto por el backend: { "teacher.firstName": "..." }
 * @param setError - Función setError de RHF
 */
export const mapBackendErrorsToRHF = <T extends FieldValues>(
  fieldErrors: Record<string, string>,
  setError: UseFormSetError<T>
) => {
  Object.entries(fieldErrors).forEach(([key, message]) => {
    // RHF acepta paths nested usando "."
    setError(key as any, { type: "server", message });
  });
};
