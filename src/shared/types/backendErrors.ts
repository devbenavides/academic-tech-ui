// src/types/backendErrors.ts

/** Errores de campo enviados por el backend */
export type BackendFieldErrors = Record<string, string>;

/** Respuesta completa de error del backend */
export type BackendErrorResponse = {
  timestamp: string;
  status: number;
  error: string;
  type: "validation" | "badRequest"; // Puedes agregar otros tipos si los hay
  message: string;
  fieldErrors: BackendFieldErrors | null;
};
